import React from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
    IconButton,
    Button,
    makeStyles,
    Card,
    CardHeader,
    Avatar,
    CardContent,
    Tooltip,
    CardActions,
} from "@material-ui/core";
import SelectControl from "./SelectControl";
import { positions } from "chess";
import cx from "clsx";

const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },

    card: {
        boxShadow: theme.shadows[2],
        "&:hover": {
            boxShadow: theme.shadows[12],
            backgroundColor: theme.palette.yellow[50],
        },
        "&.highlighted": {
            backgroundColor: theme.palette.yellow["A100"],
        },
    },
}));

export default function ({ count = "", id, onConfirm }) {
    const classes = useStyles();
    const initialState = {
        color: "",
        position: "",
        type: "",
    };
    const [stateValues, setStateValues] = React.useState(initialState);
    const [isConfirmed, setIsConfirmed] = React.useState(false);

    const changeHandler = React.useCallback(
        (e) => {
            setStateValues({ ...stateValues, [e.target.name]: e.target.value });
        },
        [stateValues]
    );

    const confirmHandler = React.useCallback(
        (e) => {
            setIsConfirmed(true);
            onConfirm({ ...stateValues, id });
        },
        [id, onConfirm, stateValues]
    );

    const resetHandler = React.useCallback(() => {
        setStateValues(initialState);
        setIsConfirmed(false);
    }, [initialState]);

    const itemPositions = positions.map((item) => ({ value: item, label: item }));

    return (
        <Card className={cx(classes.card, isConfirmed && "highlighted")}>
            <CardHeader
                avatar={
                    count !== "" && (
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {count}
                        </Avatar>
                    )
                }
                action={
                    <Tooltip title="Reset values">
                        <IconButton aria-label="settings" onClick={resetHandler}>
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                }
                title={`Piece number #${count}`}
                subheader="Setting up the color, type, and position"
            />

            <CardContent>
                <SelectControl
                    disabled={isConfirmed}
                    options={[
                        {
                            value: "B",
                            label: "Black",
                        },
                        {
                            value: "W",
                            label: "White",
                        },
                    ]}
                    name="color"
                    value={stateValues.color}
                    label="Enter colour (W/B): "
                    onChange={changeHandler}
                />
                <SelectControl
                    disabled={isConfirmed}
                    options={[
                        {
                            value: "B",
                            label: "B - Bishop",
                        },
                        {
                            value: "N",
                            label: "N - Horse",
                        },
                        {
                            value: "R",
                            label: "R - Rook",
                        },
                    ]}
                    name="type"
                    value={stateValues.type}
                    label="Enter type (B - Bishop, N - Horse, R - Rook): "
                    onChange={changeHandler}
                />
                <SelectControl
                    disabled={isConfirmed}
                    options={itemPositions}
                    name="position"
                    value={stateValues.position}
                    label="Enter position : "
                    onChange={changeHandler}
                />
                <CardActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={confirmHandler}
                        disabled={
                            [
                                stateValues.type,
                                stateValues.color,
                                stateValues.position,
                            ].includes("") || isConfirmed
                        }
                        style={{ justifyContent: "center", marginTop: 8 }}
                        fullWidth
                    >
                        CONFIRM
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}
