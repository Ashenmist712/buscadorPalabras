const textoInput = document.getElementById('textoInput');
const palabraABuscar = document.getElementById('palabraBuscar');
const formularioBuscador = document.getElementById('formularioBuscador');
const botonLimpiar = document.getElementById('btn_Limpiar');
const resultado = document.getElementById('resultado');
const textoProcesado = document.getElementById('textoProcesado');

const mostrarAlerta = (mensaje, tipo = 'error') => {
    const esError = tipo === 'error';
    const alerta = document.createElement('div');

    alerta.className = `alerta alerta--${esError ? 'error' : 'success'}`;
    alerta.textContent = mensaje;

    resultado.replaceChildren(alerta);
};

const escaparRegex = (texto) => texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const acentos = {
    á: 'a',
    é: 'e',
    í: 'i',
    ó: 'o',
    ú: 'u',
};

const quitarAcentos = (cadena) =>
    cadena.toLowerCase().replace(/[áéíóú]/g, (letra) => acentos[letra]);

const normalizarTexto = (texto) => {
    let normalizado = '';
    const inicioOriginal = [];
    const finOriginal = [];
    let indiceOriginal = 0;

    for (const caracter of texto) {
        const inicio = indiceOriginal;
        indiceOriginal += caracter.length;

        const caracteresSinAcentos = quitarAcentos(caracter);

        if (caracteresSinAcentos.length === 0 && finOriginal.length > 0) {
            finOriginal[finOriginal.length - 1] = indiceOriginal;
        }

        for (const caracterNormalizado of caracteresSinAcentos) {
            normalizado += caracterNormalizado;
            for (let indice = 0; indice < caracterNormalizado.length; indice++) {
                inicioOriginal.push(inicio);
                finOriginal.push(indiceOriginal);
            }
        }
    }

    return { normalizado, inicioOriginal, finOriginal };
};

formularioBuscador.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const texto = textoInput.value;
    const palabra = palabraABuscar.value.trim();

    resultado.replaceChildren();
    textoProcesado.replaceChildren();

    if (texto.trim() === '') {
        mostrarAlerta('El texto no puede estar vacío.');
        return;
    }

    if (palabra === '') {
        mostrarAlerta('Escribe la palabra que quieres buscar.');
        return;
    }

    const textoNormalizado = normalizarTexto(texto);
    const palabraNormalizada = quitarAcentos(palabra);

    if (palabraNormalizada === '') {
        mostrarAlerta('La palabra debe contener letras o números.');
        return;
    }

    const patron = new RegExp(
        `(^|[^\\p{L}\\p{N}_])(${escaparRegex(palabraNormalizada)})(?=$|[^\\p{L}\\p{N}_])`,
        'giu'
    );

    let contador = 0;
    let posicion = 0;

    for (const coincidencia of textoNormalizado.normalizado.matchAll(patron)) {
        const inicioNormalizado = coincidencia.index + coincidencia[1].length;
        const finNormalizado = inicioNormalizado + coincidencia[2].length;
        const inicioPalabra = textoNormalizado.inicioOriginal[inicioNormalizado];
        const finPalabra = textoNormalizado.finOriginal[finNormalizado - 1];

        textoProcesado.append(
            document.createTextNode(texto.slice(posicion, inicioPalabra))
        );

        const marca = document.createElement('mark');
        marca.textContent = texto.slice(inicioPalabra, finPalabra);
        textoProcesado.append(marca);

        posicion = finPalabra;
        contador++;
    }

    textoProcesado.append(document.createTextNode(texto.slice(posicion)));

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
    resultado.replaceChildren();
    textoProcesado.replaceChildren();
});
