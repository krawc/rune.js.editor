import React from "react";
import { makeStyles, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

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

export default function ({ value, disabled, onChange, label, name, options = [] }) {
    const classes = useStyles();
    return (
        <FormControl
            variant="outlined"
            className={classes.formControl}
            disabled={disabled}
        >
            <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
            <Select
                disabled={disabled}
                labelId="label-id"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                label={label}
            >
                <MenuItem value="" disabled>
                    <em>None</em>
                </MenuItem>
                {options.map((item) => (
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
