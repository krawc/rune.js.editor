import React from "react";
import {
    makeStyles,
    Card,
    CardHeader,
    Box,
    CardContent,
    Chip,
    CardActions,
    Typography,
    ButtonGroup,
    Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },

    card: {
        padding: 12,
        marginTop: 12,
    },
}));

export default function ({ data, onContinue }) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader title="Valid moves" subheader="All possible valid moves" />

            <CardContent>
                {data.map((item) => (
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Typography>
                            {item.type} on {item.position} :{" "}
                        </Typography>
                        {item.moves.map((item) => (
                            <Chip variant="outlined" label={item} />
                        ))}
                    </Box>
                ))}
            </CardContent>
            <CardActions>
                <Typography>Would you like to continue?</Typography>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button color="error"> No</Button>
                    <Button variant="contained" color="primary" onClick={onContinue}>
                        Yes
                    </Button>
                </ButtonGroup>
            </CardActions>
        </Card>
    );
}
