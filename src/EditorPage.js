import React, { useState, useRef } from "react";
import * as ReactDOM from "react-dom";
import Layout from "components/Layout";
import RefreshIcon from "@material-ui/icons/Refresh";
import { IconButton, Tooltip, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { ReactComponent as ChessIcon } from "assets/chess-solid.svg";
import { initChessboard } from "chess";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

import FindMoveSection from "components/FindMoveSection";
import Rune from "rune.js";
import Noise from "rune.noise.js";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";

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

const drawPackage = (instance, packageType) => {
    console.log(packageType);
    switch (packageType) {
        case "Flat Box":
            instance
                .polygon(0, 0)
                .stroke(false)
                .fill("hsv", 0, 0, 100)
                .lineTo(250, 1000)
                .lineTo(250, 1005)
                .lineTo(130, 1005)
                .lineTo(130, 1130)
                .lineTo(250, 1130)
                .lineTo(870, 1130)
                .lineTo(870, 1005)
                .lineTo(750, 1005)
                .lineTo(750, 1000)
                .lineTo(1000, 1000)
                .lineTo(1000, 620)
                .lineTo(750, 620)
                .lineTo(750, 615)
                .lineTo(870, 615)
                .lineTo(870, 505)
                .lineTo(750, 505)
                .lineTo(740, 500)
                .lineTo(750, 495)
                .lineTo(850, 460)
                .lineTo(850, 150)
                .lineTo(740, 120)
                .lineTo(810, 120)
                .lineTo(750, 0)
                .lineTo(1000, 0)
                .lineTo(1000, 1150)
                .lineTo(0, 1150)
                .lineTo(0, 0)
                .lineTo(250, 0)
                .lineTo(190, 120)
                .lineTo(260, 120)
                .lineTo(150, 150)
                .lineTo(150, 460)
                .lineTo(250, 495)
                .lineTo(260, 500)
                .lineTo(250, 505)
                .lineTo(130, 505)
                .lineTo(130, 615)
                .lineTo(250, 615)
                .lineTo(250, 620)
                .lineTo(0, 620)
                .lineTo(0, 1000)
                .lineTo(250, 1000)
                .rotate(180, instance.width / 2, instance.height / 2);
            instance.draw();

            break;

        case "Envelope":
            instance
                .polygon(1005, 1005)
                .stroke(false)
                .fill("hsv", 0, 0, 100)
                .lineTo(1005, 0)
                .lineTo(0, 0)
                .lineTo(0, 1005)
                .lineTo(1005, 1005)
                .lineTo(633, 979)
                .lineTo(771, 733)
                .lineTo(821, 710)
                .lineTo(937, 504)
                .lineTo(771, 352)
                .lineTo(749, 254)
                .lineTo(502, 20)
                .lineTo(253, 254)
                .lineTo(233, 352)
                .lineTo(63, 504)
                .lineTo(183, 710)
                .lineTo(233, 733)
                .lineTo(370, 979)
                .lineTo(502, 848)
                .lineTo(632, 978)
                .move(-500, 0);
            instance.draw();
        default:
            break;
    }
};

const executeCode = (e, code, el, hasPackage, packageType) => {
    e.preventDefault();

    try {
        console.log(packageType);

        el.innerHTML = "";

        var f = new Function("Rune", code + " return r;");
        var instance = f.apply(document.body, [Rune]);

        if (hasPackage) drawPackage(instance, packageType);
    } catch (error) {
        alert(error);
    }
};

const openSvg = (svg) => {
    var myWindow = window.open("");
    myWindow.document.write(svg);
};

export default function () {
    const classes = useStyles();
    const outputRel = useRef(null);
    const [code, setCode] = useState(`var r = new Rune({
        container: "#canvas",
        width: 1000,
        height: 1000
    });`);
    const [hasPackage, setHasPackage] = useState(false);
    const [packageType, setPackageType] = useState(null);

    return (
        <Layout title="Rune.js Editor">
            <Grid container spacing={2}>
                <Grid item xs="12" sm="6" style={{ margin: "30px 0" }}>
                    <FormGroup
                        row
                        style={{
                            margin: "0 0 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={hasPackage}
                                    onChange={() => setHasPackage(!hasPackage)}
                                    name="hasPackage"
                                    color="primary"
                                />
                            }
                            label="Include Packaging"
                        />
                        {hasPackage ? (
                            <FormControlLabel
                                control={
                                    <Select
                                        checked={packageType}
                                        onChange={(e) => setPackageType(e.target.value)}
                                        name="packageType"
                                        color="primary"
                                    >
                                        <MenuItem value="Flat Box">Flat Box</MenuItem>
                                    </Select>
                                }
                                label="Select Package Type"
                            />
                        ) : null}
                    </FormGroup>
                    <div style={{ maxHeight: 500, overflow: "scroll" }}>
                        <Editor
                            value={code}
                            onValueChange={(code) => setCode(code)}
                            highlight={(c) => highlight(c, languages.js)}
                            padding={10}
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 14,
                                background: "#000",
                                color: "#fff",
                                margin: "0 0 30px",
                            }}
                        />
                    </div>
                    <Button
                        variant="contained"
                        onClick={(e) => {
                            executeCode(
                                e,
                                code,
                                outputRel.current,
                                hasPackage,
                                packageType
                            );
                        }}
                    >
                        RUN
                    </Button>
                </Grid>
                <Grid item xs="12" sm="6">
                    <div
                        id="canvas"
                        style={{
                            background: "#fff",
                            height: 500,
                            margin: "88px 0 30px",
                            overflow: "scroll",
                        }}
                        ref={outputRel}
                    ></div>
                    <Button
                        variant="contained"
                        onClick={(e) => {
                            openSvg(outputRel.current.innerHTML);
                        }}
                    >
                        DOWNLOAD
                    </Button>
                </Grid>
            </Grid>
        </Layout>
    );
}
