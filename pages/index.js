import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
    const [game, setGame] = useState({});
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [finished, setFinished] = useState(false);
    const [draw, setDraw] = useState(false);
    const [selected, setSelected] = useState("");

    const id = uuidv4();

    console.log(id);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                "http://localhost:3000/api/tic-tac-toe/play"
            );
            const response = await res.json();
            setGame(response);
            if (response.status === "_Match has finished_") {
                setFinished(true);
            }
            if (response.status === "_Draw_") {
                setDraw(true);
            }
        };
        fetchData();
    }, [count]);

    const handlePlay = async (played) => {
        setFinished(false);
        setDraw(false);
        const response = await fetch(
            "http://localhost:3000/api/tic-tac-toe/play",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(played),
            }
        );

        const json = await response.json();
        setCount(count + 1);

        if (json.inicio === "Bot" && json.historial.length === 1) {
            setSelected(json.historial[0].caracter === "o" ? "x" : "o");
        }

        if (json.inicio === "User" && json.historial.length === 0) {
            setOpen(true);
        } else {
            setOpen(false);
        }

        if (response.status === 400) {
            alert(json);
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>OX</title>
                <meta name="description" content="Tic Tac Toe test" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Tic Tac Toe</h1>
            </main>

            <div className={styles.grid}>
                {game?.estadoTablero?.map((item, index) => (
                    <p
                        key={index}
                        className={styles.cube}
                        onClick={() =>
                            handlePlay({
                                siguienteMovimiento: {
                                    caracter: selected,
                                    posicion: index,
                                },
                            })
                        }
                    >
                        {item}
                    </p>
                    // <div>
                    // console.log(item);
                    // </div>;
                ))}
            </div>

            <div className={open ? styles.selection : styles.disabled}>
                <p
                    className={styles.item}
                    onClick={
                        () => {
                            setSelected("o");
                            setOpen(false);
                        }
                        // handlePlay({
                        //     siguienteMovimiento: {
                        //         caracter: "o",
                        //         posicion: position,
                        //     },
                        // })
                    }
                >
                    o
                </p>

                <p
                    className={styles.item}
                    onClick={
                        () => {
                            setSelected("x");
                            setOpen(false);
                        }
                        // handlePlay({
                        //     siguienteMovimiento: {
                        //         caracter: "x",
                        //         posicion: position,
                        //     },
                        // })
                    }
                >
                    x
                </p>
            </div>

            <div className={finished ? styles.finished : styles.disabled}>
                <p>
                    El juego ha terminado, han ganado los{" "}
                    {game?.historial?.length > 0 ? game.winner : ""}
                </p>
                <button
                    onClick={() => handlePlay({ partidaId: id, new: true })}
                >
                    Play Again
                </button>
            </div>

            <div className={draw ? styles.finished : styles.disabled}>
                <p>El juego ha terminado en empate</p>
                <button
                    onClick={() => handlePlay({ partidaId: id, new: true })}
                >
                    Play Again
                </button>
            </div>

            <button onClick={() => handlePlay({ new: true })}>Play</button>
        </div>
    );
}

// export const getServerSideProps = async () => {
//     const res = await fetch("http://localhost:3000/api/tic-tac-toe/play");
//     const game = await res.json();
//     return {
//         props: {
//             game,
//         },
//     };
// };
