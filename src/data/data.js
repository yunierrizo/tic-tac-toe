const data = [
    {
        partidaId: "5a5c6f9b4d749d008e07e695",
        estadoTablero: [
            "-",
            "-",
            "-", // primera línea del tablero, posiciones 0, 1, 2
            "-",
            "-",
            "-", // segunda línea del tablero, posiciones 3, 4, 5
            "-",
            "-",
            "-", // tercera línea del tablero, posiciones 6, 7, 8
        ], // array de caracteres ( ej: ['o','x','-']), requerido
        siguienteMovimiento: {
            // caracter: "-", // uno de estos caracteres ['o','x'], requerido
            // posicion: 0, // número del 0 a 8, requerido
        }, // objeto, representa el siguiente movimiento del jugador, requerido solo en el input
        historial: [
            // {
            //     caracter: "x",
            //     posicion: 0,
            // },
        ],
        inicio: "",
        status: "",
        winner: "",
    },
];

module.exports = data;
