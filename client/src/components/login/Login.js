import React from 'react'
import { Typography, Container, Card } from '@material-ui/core'
import LoginForm from '../utils/forms/LoginForm'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    card: {
        height: '70vh',
        width: '60wh',

    }
}));
function Login() {
   
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Card className={classes.card} elevation={5} >
                <LoginForm />
            </Card>

        </Container>
    )
}

export default Login;
