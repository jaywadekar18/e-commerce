import React from 'react'
import { Typography, Container, Card } from '@material-ui/core'
import SignUpForm from '../utils/forms/SignUpForm'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    card: {
        height: '80vh',
        width: '60wh',

    }
}));
function SignUp() {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Card className={classes.card} elevation={5}>
                <SignUpForm />
            </Card>
        </Container>
    )
}

export default SignUp
