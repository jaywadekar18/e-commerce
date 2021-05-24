import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Container, Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";




const useStyles = makeStyles({
   
    root: {
        maxWidth: 160,
        textAlign: 'center'
    },
    media: {
        height: 100,
       
    },
    textArea: {
        height: 10
    },
    name:{
        fontSize:20
    },
    "@media(max-width: 800px)": {
        media: {
            height: 80
        },
        root: {
           width:120,
        },
        name:{
            fontSize:16
        },

    },
    "@media(max-width: 500px)": {
        media: {
            height: 60
        },
        root: {
           width:100,
        },
        name:{
            fontSize:14
        },
    },
    

});


export default function MediaCard({categories}) {
    let history = useHistory();
    const classes = useStyles();
    function clickHandler() {

        history.push("/electronics");
    }
    return (
       
           
            <Grid container spacing={2} direction='row' justify='space-evenly'>

                {
                    categories && categories.map((category) => (<Grid item>

                        <Card className={classes.root} onClick={clickHandler} >
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={category.imagesLink}
                                  
                                />
                                <CardContent className={classes.textArea}>
                                    <Typography className={classes.name} gutterBottom variant="h6" >{category.name} </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions  >
                                <Button size="small" color="primary">View products</Button>
                            </CardActions>
                        </Card>
                    </Grid>))
                }
            </Grid>
     
    );
}
