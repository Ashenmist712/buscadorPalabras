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

eval("{\nconst textoInput = document.getElementById('textoInput');\nconst palabraABuscar = document.getElementById('palabraBuscar');\nconst formularioBuscador = document.getElementById('formularioBuscador');\nconst botonLimpiar = document.getElementById('btn_Limpiar');\nconst resultado = document.getElementById('resultado');\nconst textoProcesado = document.getElementById('textoProcesado');\n\n\nconst acentos = {\n    á: 'a',\n    é: 'e',\n    í: 'i',\n    ó: 'o',\n    ú: 'u',\n};\n\nconst mostrarAlerta = (mensaje, tipo = 'error') => {\n    const esError = tipo === 'error';\n    const claseAlerta = `alerta alerta--${esError ? 'error' : 'success'}`;\n\n    resultado.innerHTML = `<div class=\"${claseAlerta}\">${mensaje}</div>`;\n};\n\n\nconst quitarAcentos = (cadena) =>\n    cadena.toLowerCase().replace(/[áéíóú]/g, (letra) => acentos[letra]);\n\n\nconst limpiarPuntuacion = (cadena) =>\n    cadena.replace(/[.,\\/#!$%\\^&\\*;:{}=\\-_`~()¿?¡!]/g, '');\n\n\nformularioBuscador.addEventListener('submit', (evento) => {\n    evento.preventDefault();\n    const texto = textoInput.value;\n    const palabra = palabraABuscar.value.trim();\n\n    \n    resultado.innerHTML = '';\n    textoProcesado.innerHTML = '';\n\n    \n    if (texto.trim() === '') {\n        mostrarAlerta('El texto no puede estar vacío.');\n        return;\n    }\n\n    if (palabra === '') {\n        mostrarAlerta('Escribe la palabra que quieres buscar.');\n        return;\n    }\n\n    \n    const palabraBuscadaLimpia = quitarAcentos(palabra);\n\n    if (palabraBuscadaLimpia === '') {\n        mostrarAlerta('La palabra debe contener letras o números.');\n        return;\n    }\n\n    \n    const arregloPalabras = texto.split(' ');\n\n\n    const coincidencias = arregloPalabras.filter((palabraActual) => {\n        const palabraLimpia = quitarAcentos(limpiarPuntuacion(palabraActual));\n        return palabraLimpia === palabraBuscadaLimpia;\n    });\n\n    const contador = coincidencias.length;\n\n    const arregloProcesado = arregloPalabras.map((palabraActual) => {\n        const palabraLimpia = quitarAcentos(limpiarPuntuacion(palabraActual));\n\n        if (palabraLimpia === palabraBuscadaLimpia) {\n            return `<mark>${palabraActual}</mark>`;\n        }\n        return palabraActual;\n    });\n\n    textoProcesado.innerHTML = arregloProcesado.join(' ');\n\n    if (contador > 0) {\n        mostrarAlerta(\n            `Se encontró \"${palabra}\" ${contador} ${contador === 1 ? 'vez' : 'veces'}.`,\n            'success'\n        );\n    } else {\n        mostrarAlerta(`No se encontró \"${palabra}\" en el texto.`);\n    }\n});\n\nbotonLimpiar.addEventListener('click', () => {\n    textoInput.value = '';\n    palabraABuscar.value = '';\n    resultado.innerHTML = '';\n    textoProcesado.innerHTML = '';\n});\n\n//# sourceURL=webpack://plantilla/./src/index.js?\n}");

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