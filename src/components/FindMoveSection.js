import React from "react";
import Layout from "components/Layout";
import RefreshIcon from "@material-ui/icons/Refresh";
import { IconButton, Typography, makeStyles, Grid, Divider } from "@material-ui/core";
import { ReactComponent as ChessIcon } from "assets/chess-solid.svg";
import { initChessboard, getMoves } from "chess";
import SelectControl from "components/SelectControl";
import FormCard from "components/FormCard";
import ResultCard from "components/ResultCard";

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
    divider: {
        marginBottom: 24,
        marginTop: 12,
    },
}));

export default function ({ chess, onChessChange, onContinue, onResult }) {
    const classes = useStyles();
    const [results, setResults] = React.useState([]);

    const [pieceCount, setPieceCount] = React.useState();

    const onPieceCountHandler = React.useCallback((e) => {
        setPieceCount(e.target.value);
    }, []);

    const pieces = React.useMemo(() => {
        const _pieces = [];
        for (let i = 0; i < pieceCount; i++) {
            _pieces.push({
                values: {
                    color: "",
                    type: "",
                    position: "",
                },
                count: i + 1,
                color: "",
            });
        }
        return _pieces;
    }, [pieceCount]);

    const formConfirmHandler = React.useCallback(
        (value) => {
            const newResults = results.filter((item) => item.id !== value.id);
            const _results = [...newResults, { ...value, moves: getMoves(value)(chess) }];
            setResults(_results);
            onChessChange({
                ...chess,
                [value.position]: { ...chess[value.position], ...value },
            });
            if (_results.length && _results.length === pieceCount) {
                onResult();
            }
        },
        [chess, onChessChange, onResult, pieceCount, results]
    );

    const pieceValuesChangeHandler = React.useCallback((e) => {}, []);

    return (
        <div className={classes.paper}>
            <Typography component="h6" variant="h6">
                Find valid moves
            </Typography>

            <SelectControl
                classes={classes}
                options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => ({
                    value: item,
                    label: item,
                }))}
                name="pieceNumber"
                value={pieceCount}
                label="Enter number of pieces: "
                onChange={onPieceCountHandler}
            />
            <Grid container spacing={3} style={{ marginTop: 16 }}>
                {pieces.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <FormCard
                            {...item}
                            id={index}
                            onChange={pieceValuesChangeHandler}
                            onConfirm={formConfirmHandler}
                        />
                    </Grid>
                ))}
            </Grid>

            <Grid container space={2}>
                {results.length && results.length === pieceCount ? (
                    <Grid sm={12}>
                        <ResultCard data={results} onContinue={onContinue} />
                    </Grid>
                ) : null}
            </Grid>

            <Divider className={classes.divider} />
        </div>
    );
}
