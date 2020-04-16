import React from "react";
import Layout from "components/Layout";
import RefreshIcon from "@material-ui/icons/Refresh";
import { IconButton, Tooltip, makeStyles } from "@material-ui/core";
import { ReactComponent as ChessIcon } from "assets/chess-solid.svg";
import { initChessboard } from "chess";

import FindMoveSection from "components/FindMoveSection";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
        width: "100%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    card: {
        margin: 4,
    },
}));

function strollToBottom() {
    const scrollingElement = document.scrollingElement || document.body;
    window.scrollTo({
        top: scrollingElement.scrollHeight + 1000,
        behavior: "smooth",
    });
}

export default function () {
    const classes = useStyles();
    const [chess, setChess] = React.useState();
    const [tries, setTries] = React.useState([
        {
            id: Math.round(Math.random() * 100),
        },
    ]);

    React.useEffect(() => {
        setChess(initChessboard());
    }, []);

    const onChessChange = React.useCallback((value) => {
        setChess(value);
    }, []);

    const onContinue = React.useCallback(
        (value) => {
            setTries([
                ...tries,
                {
                    id: tries.length,
                },
            ]);
            strollToBottom();
        },
        [tries]
    );

    const resetHandler = React.useCallback(() => {
        setTries([{ id: Math.round(Math.random() * 100) }]);
    }, []);

    return (
        <Layout
            title="Chess v-01"
            appIconComponent={
                <IconButton>
                    <ChessIcon style={{ color: "#fff", width: 24, height: 24 }} />
                </IconButton>
            }
            actionComponent={
                <Tooltip title="RESET">
                    <IconButton onClick={resetHandler} color="secondary">
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
            }
        >
            {tries.map((item) => (
                <FindMoveSection
                    key={item.id}
                    chess={chess}
                    onChessChange={onChessChange}
                    onContinue={onContinue}
                    onResult={() => strollToBottom()}
                />
            ))}
        </Layout>
    );
}
