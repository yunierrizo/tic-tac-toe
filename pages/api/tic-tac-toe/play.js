import data from "../../../src/data/data";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function botPlay(pisition, caracter) {}

export default function play(req, res) {
    let gameData = data[0];

    const inicio = getRandomInt(9) % 2 === 0 ? "Bot" : "User";
    const inicialPlay = getRandomInt(2) % 2 === 0 ? "o" : "x";
    const inicialPos = getRandomInt(8);

    const initial = {
        partidaId: "",
        estadoTablero: ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
        siguienteMovimiento: {},
        historial: [],
        inicio: inicio,
    };
    const { method, body } = req;

    switch (method) {
        case "POST":
            try {
                const pos = body?.siguienteMovimiento?.posicion;
                const play = body?.siguienteMovimiento?.caracter;
                const item = gameData?.estadoTablero[pos];
                const emptyCell = [];

                if (body.new) {
                    gameData = initial;
                    if (inicio === "Bot") {
                        gameData.estadoTablero[inicialPos] = inicialPlay;
                        gameData = {
                            ...gameData,
                            historial: [
                                { caracter: inicialPlay, posicion: inicialPos },
                            ],
                        };
                    }
                    data[0] = gameData;
                    return res.status(201).json(gameData);
                } else {
                    if (item === "-") {
                        if (body.partidaId) {
                            if (body.partidaId !== gameData.partidaId) {
                                throw new Error("_Not valid matchId_");
                            }
                        }

                        gameData.estadoTablero[pos] = play;
                        gameData = {
                            ...gameData,
                            historial: [
                                ...gameData.historial,
                                { caracter: play, posicion: pos },
                            ],
                        };
                        data[0] = gameData;

                        //bot
                        for (let i = 0; i <= 8; i++) {
                            if (gameData.estadoTablero[i] === "-") {
                                emptyCell.push(i);
                            }
                        }
                        const botPlay = play === "o" ? "x" : "o";
                        const botPos = getRandomInt(emptyCell.length - 1);
                        gameData.estadoTablero[emptyCell[botPos]] = botPlay;
                        gameData = {
                            ...gameData,
                            historial: [
                                ...gameData.historial,
                                {
                                    caracter: botPlay,
                                    posicion: emptyCell[botPos],
                                },
                            ],
                        };
                        data[0] = gameData;
                        return res.status(200).json(gameData);
                    } else {
                        throw new Error("_Not valid move_");
                    }
                }

                // if(){

                // }
            } catch (error) {
                return res.status(400).json(error.message);
            }

        case "GET":
            try {
                gameData = data[0];
                const board = gameData.estadoTablero;
                const history = gameData.historial;

                //row
                for (let i = 0; i <= 6; i = i + 3) {
                    if (
                        board[i] !== "-" &&
                        board[i] === board[i + 1] &&
                        board[i + 1] == board[i + 2]
                    ) {
                        gameData = {
                            ...gameData,
                            status: "_Match has finished_",
                            winner: board[i] === "x" ? "x" : "o",
                        };
                        // throw new Error("_Match has finished_");
                        data[0] = gameData;
                        return res.status(200).json(data[0]);
                    }
                }

                //column
                for (let i = 0; i <= 2; i++) {
                    if (
                        board[i] !== "-" &&
                        board[i] === board[i + 3] &&
                        board[i + 3] === board[i + 6]
                    ) {
                        gameData = {
                            ...gameData,
                            status: "_Match has finished_",
                            winner: board[i] === "x" ? "x" : "o",
                        };
                        data[0] = gameData;
                        return res.status(200).json(data[0]);
                    }
                }

                //diagonal
                for (let i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
                    if (
                        board[i] !== "-" &&
                        board[i] == board[i + j] &&
                        board[i + j] === board[i + 2 * j]
                    ) {
                        gameData = {
                            ...gameData,
                            status: "_Match has finished_",
                            winner: board[i] === "x" ? "x" : "o",
                        };
                        data[0] = gameData;
                        return res.status(200).json(data[0]);
                    }
                }

                //draw
                if (history.length === 9) {
                    gameData = {
                        ...gameData,
                        status: "_Draw_",
                    };
                    data[0] = gameData;
                    return res.status(200).json(data[0]);
                }

                return res.status(200).json(data[0]);
            } catch (error) {
                return res.status(200).json(error.message);
            }

        default:
            return res.status(400).json("invalid method");
    }
}
