
const textoInput = document.getElementById('textoInput');
const palabraABuscar = document.getElementById('palabraBuscar');
const formularioBuscador = document.getElementById('formularioBuscador');
const botonLimpiar = document.getElementById('btn_Limpiar');
const resultado = document.getElementById('resultado');
const textoProcesado = document.getElementById('textoProcesado');


const acentos = {
    á: 'a',
    é: 'e',
    í: 'i',
    ó: 'o',
    ú: 'u',
};

const mostrarAlerta = (mensaje, tipo = 'error') => {
    const esError = tipo === 'error';
    const claseAlerta = `alerta alerta--${esError ? 'error' : 'success'}`;

    resultado.innerHTML = `<div class="${claseAlerta}">${mensaje}</div>`;
};


const quitarAcentos = (cadena) =>
    cadena.toLowerCase().replace(/[áéíóú]/g, (letra) => acentos[letra]);


const limpiarPuntuacion = (cadena) =>
    cadena.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¿?¡!]/g, '');


formularioBuscador.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const texto = textoInput.value;
    const palabra = palabraABuscar.value.trim();

    
    resultado.innerHTML = '';
    textoProcesado.innerHTML = '';

    
    if (texto.trim() === '') {
        mostrarAlerta('El texto no puede estar vacío.');
        return;
    }

    if (palabra === '') {
        mostrarAlerta('Escribe la palabra que quieres buscar.');
        return;
    }

    
    const palabraBuscadaLimpia = quitarAcentos(palabra);

    if (palabraBuscadaLimpia === '') {
        mostrarAlerta('La palabra debe contener letras o números.');
        return;
    }

    
    const arregloPalabras = texto.split(' ');


    const coincidencias = arregloPalabras.filter((palabraActual) => {
        const palabraLimpia = quitarAcentos(limpiarPuntuacion(palabraActual));
        return palabraLimpia === palabraBuscadaLimpia;
    });

    const contador = coincidencias.length;

    const arregloProcesado = arregloPalabras.map((palabraActual) => {
        const palabraLimpia = quitarAcentos(limpiarPuntuacion(palabraActual));

        if (palabraLimpia === palabraBuscadaLimpia) {
            return `<mark>${palabraActual}</mark>`;
        }
        return palabraActual;
    });

    textoProcesado.innerHTML = arregloProcesado.join(' ');

    if (contador > 0) {
        mostrarAlerta(
            `Se encontró "${palabra}" ${contador} ${contador === 1 ? 'vez' : 'veces'}.`,
            'success'
        );
    } else {
        mostrarAlerta(`No se encontró "${palabra}" en el texto.`);
    }
});

botonLimpiar.addEventListener('click', () => {
    textoInput.value = '';
    palabraABuscar.value = '';
    resultado.innerHTML = '';
    textoProcesado.innerHTML = '';
});