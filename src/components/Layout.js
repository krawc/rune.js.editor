import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";

function Footer() {
    return (
        <Box
            pt={4}
            pb={1}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            style={{
                width: "100%",
                bottom: 0,
                left: 0,
            }}
        >
            <Divider style={{ marginBottom: 12 }} />
            <Typography variant="body2" color="textSecondary" align="center">
                <Link color="inherit" href="https://portfolio.cyianite.now.sh/">
                    Christian R. Crisologo - Senior Front-end Developer
                </Link>
            </Typography>
            <Typography variant="caption" color="textSecondary" align="center">
                Copyright © {new Date().getFullYear()}
            </Typography>
        </Box>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        marginBottom: 60,
        flexDirection: "column",
        height: "100%",
        minHeight: 800,
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        color: theme.palette.common.white,
    },

    title: {
        flexGrow: 1,
    },

    content: {
        flexGrow: 1,
        height: "100%",
        overflow: "auto",
    },
    container: {
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function ({ appIconComponent, title, actionComponent, children }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="sticky">
                <Toolbar className={classes.toolbar}>
                    {appIconComponent}
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        {title}
                    </Typography>
                    {actionComponent}
                </Toolbar>
            </AppBar>

            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    {children}
                </Container>
            </main>
            <Footer />
        </div>
    );
}
