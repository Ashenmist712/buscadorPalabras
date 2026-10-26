/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
() {

eval("{const textoInput = document.getElementById('textoInput');\nconst palabraABuscar = document.getElementById('palabraBuscar');\nconst formularioBuscador = document.getElementById('formularioBuscador');\nconst botonLimpiar = document.getElementById('btn_Limpiar');\nconst resultado = document.getElementById('resultado');\nconst textoProcesado = document.getElementById('textoProcesado');\n\nconst mostrarAlerta = (mensaje, tipo = 'error') => {\n    const esError = tipo === 'error';\n    const alerta = document.createElement('div');\n\n    alerta.className = `alerta alerta--${esError ? 'error' : 'success'}`;\n    alerta.textContent = mensaje;\n\n    resultado.replaceChildren(alerta);\n};\n\nconst escaparRegex = (texto) => texto.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');\n\nconst acentos = {\n    á: 'a',\n    é: 'e',\n    í: 'i',\n    ó: 'o',\n    ú: 'u',\n};\n\nconst quitarAcentos = (cadena) =>\n    cadena.toLowerCase().replace(/[áéíóú]/g, (letra) => acentos[letra]);\n\nconst normalizarTexto = (texto) => {\n    let normalizado = '';\n    const inicioOriginal = [];\n    const finOriginal = [];\n    let indiceOriginal = 0;\n\n    for (const caracter of texto) {\n        const inicio = indiceOriginal;\n        indiceOriginal += caracter.length;\n\n        const caracteresSinAcentos = quitarAcentos(caracter);\n\n        if (caracteresSinAcentos.length === 0 && finOriginal.length > 0) {\n            finOriginal[finOriginal.length - 1] = indiceOriginal;\n        }\n\n        for (const caracterNormalizado of caracteresSinAcentos) {\n            normalizado += caracterNormalizado;\n            for (let indice = 0; indice < caracterNormalizado.length; indice++) {\n                inicioOriginal.push(inicio);\n                finOriginal.push(indiceOriginal);\n            }\n        }\n    }\n\n    return { normalizado, inicioOriginal, finOriginal };\n};\n\nformularioBuscador.addEventListener('submit', (evento) => {\n    evento.preventDefault();\n    const texto = textoInput.value;\n    const palabra = palabraABuscar.value.trim();\n\n    resultado.replaceChildren();\n    textoProcesado.replaceChildren();\n\n    if (texto.trim() === '') {\n        mostrarAlerta('El texto no puede estar vacío.');\n        return;\n    }\n\n    if (palabra === '') {\n        mostrarAlerta('Escribe la palabra que quieres buscar.');\n        return;\n    }\n\n    const textoNormalizado = normalizarTexto(texto);\n    const palabraNormalizada = quitarAcentos(palabra);\n\n    if (palabraNormalizada === '') {\n        mostrarAlerta('La palabra debe contener letras o números.');\n        return;\n    }\n\n    const patron = new RegExp(\n        `(^|[^\\\\p{L}\\\\p{N}_])(${escaparRegex(palabraNormalizada)})(?=$|[^\\\\p{L}\\\\p{N}_])`,\n        'giu'\n    );\n\n    let contador = 0;\n    let posicion = 0;\n\n    for (const coincidencia of textoNormalizado.normalizado.matchAll(patron)) {\n        const inicioNormalizado = coincidencia.index + coincidencia[1].length;\n        const finNormalizado = inicioNormalizado + coincidencia[2].length;\n        const inicioPalabra = textoNormalizado.inicioOriginal[inicioNormalizado];\n        const finPalabra = textoNormalizado.finOriginal[finNormalizado - 1];\n\n        textoProcesado.append(\n            document.createTextNode(texto.slice(posicion, inicioPalabra))\n        );\n\n        const marca = document.createElement('mark');\n        marca.textContent = texto.slice(inicioPalabra, finPalabra);\n        textoProcesado.append(marca);\n\n        posicion = finPalabra;\n        contador++;\n    }\n\n    textoProcesado.append(document.createTextNode(texto.slice(posicion)));\n\n    if (contador > 0) {\n        mostrarAlerta(\n            `Se encontró \"${palabra}\" ${contador} ${contador === 1 ? 'vez' : 'veces'}.`,\n            'success'\n        );\n    } else {\n        mostrarAlerta(`No se encontró \"${palabra}\" en el texto.`);\n    }\n});\n\nbotonLimpiar.addEventListener('click', () => {\n    textoInput.value = '';\n    palabraABuscar.value = '';\n    resultado.replaceChildren();\n    textoProcesado.replaceChildren();\n});\n\n\n//# sourceURL=webpack://plantilla/./src/index.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	let __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;