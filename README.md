# Tic Tac Toe

Tic Tac Toe es un juego de lápiz y papel entre dos jugadores: O y X, que marcan los espacios de un tablero de 3×3 alternadamente. El ganador es quien tenga 3 jugadas del mismo tipo iguales, ya sea horizontal, vertical o diagonal.

## Instalación

Clonando el repositorio

`$ git clone https://github.com/yunierrizo/tic-tac-toe.git`

Instalar las dependencias

`$ npm install`

Correr proyecto

`$ npm run dev`

Abrir [http://localhost:3000](http://localhost:3000) en el navegador para ver el resultado.

La ruta del api es [http://localhost:3000/api/tic-tac-toe/play](http://localhost:3000/api/tic-tac-toe/play).

## Cómo se juega

El juego comienza cuando se toca el botón de Play. Se selecciona aleatoriamente quien debe comenzar el primer turno, el bot o el usuario. En caso de ser el usuario, se le permitirá seleccionar entre 0 o x con cual desea comenzar. El juego concluye cuando el bot o el usuario tiene tres jugadas iguales de manera horizontal, vertical o diagonal, o si existe un empate. Cuando el juego termina se le da la oportunidad al usuario de jugar de nuevo.

## Estructura de datos

La estructura de datos es la siguiente:

{
partidaId: "",
estadoTablero: [],
siguienteMovimiento: {},
historial: [
{
caracter: "",
posicion: 0,
},
],
inicio: "",
status: "",
winner: "",
},

Donde inicio indica si es un juego nuevo, status si el hubo un ganador o si hubo empate, y winner si gano 0 o x.
