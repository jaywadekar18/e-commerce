import { Container, Card, makeStyles, TextField, Button, Typography,Select ,MenuItem } from '@material-ui/core'
import React ,{useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {useSelector ,useDispatch} from 'react-redux'
import {getCartData} from '../../slices/cartSlice'
const useStyles = makeStyles({

    mainCard: {
       
        margin: '5vh auto',
        padding:'4vh 5vh'
    },
    title:{
        fontSize:'20px',
        fontWeight: 'bold', 
        textAlign:'center'
    } ,
    card:{
         
        margin:"10px auto",
        padding: '5px 5px'
    },
    totalPrice:{
        fontSize:'20px',
        fontWeight:'bold'
    },
    price:{
     
      fontSize:'20px'
    },
    placeOrderButton:{
        marginTop: '30px'
    }

})

function Delivery() {
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors } } = useForm();
 
    const cartItems = useSelector(state => state.cart);
   
    function onSubmit(data) {

        console.log(data);
        alert('Your Order has been confirmed!!')
    }
    return (
        <Container>
            <Card className={classes.mainCard}>
           
                <Typography className={classes.title}>Delivery and Payment</Typography>
                <Typography>Products </Typography>
                {
                    cartItems && cartItems.data && cartItems.data.map((item)=>(
                        <Card className={classes.card} elevation={3} >
                            
                              <Typography className={classes.price} >{item.name}(Rs.{item.price}) X {item.quantity} =  Rs.{item.quantity * item.price}  </Typography>
                               
                                 <p>+</p>
                             
                        </Card>
                    ))
                }
                   <Typography  className={classes.totalPrice}>Total amount={cartItems.data.reduce((acc , item)=>( acc +item.price * item.quantity),0)} </Typography>
                   
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register({
                            required: true,
                            minLength: 15,
                        })}
                        error={Boolean(errors.address)}
                        helperText={errors.address && (errors.address.type === 'required' && "Address is required")
                            || errors.address && (errors.address.type === 'minLength' && "Mininum length is 15")}

                        label="Shipping Address*"
                        name="address"
                        autoComplete="address"
                        autoFocus multiline
                        fullWidth
                        rows={4}
                    />
                    <Select inputRef={register({required: true})}  defaultValue={"cash on delivery"}>
                            <MenuItem value="cash on delivery">Cash On Delivery</MenuItem>
                            <MenuItem disabled={true} value="online payment">Online Payment</MenuItem>
                        </Select>
                    
                    <br />
                    <Button  type="submit" variant="contained" color="secondary" className={classes.placeOrderButton}>Place Order </Button>

                </form>


            </Card>

        </Container>
    )
}

export default Delivery

