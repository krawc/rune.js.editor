import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import EditorPage from "EditorPage";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <EditorPage />
        </ThemeProvider>
    );
}

export default App;
