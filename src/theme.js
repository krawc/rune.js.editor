import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        ...colors,
        primary: {
            main: colors.deepOrange[500],
        },
        secondary: {
            main: colors.amber[500],
        },
        error: {
            main: red.A400,
        },
        background: {
            default: colors.blueGrey[50],
        },
    },
});

export default theme;
