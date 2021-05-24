import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Cart from '../src/components/cart/Cart'
import Home from '../src/components/home/Home'
import Login from '../src/components/login/Login'
import SignUp from '../src/components/signUp/SignUp'
import Navbar from './components/navbar/Navbar'
import Product from '../src/components/productDescription/Product'
import Products from '../src/components/products/Products'
import Admin from '../src/components/admin/Admin'
import Delivery from '../src/components/delivery/Delivery'
import PrivateRoute from '../src/components/utils/route/PrivateRoute'
import Profile from '../src/components/profile/Profile'
import Search from '../src/components/search/Search'
function App() {
  return (
    <div >

      <Router>
        <Navbar />

        <Switch>

        <Route exact path='/' component={Home} />
        <Route path='/cart' component={Cart} />
        <Route path='/login' component={Login} />
        <Route path='/signUp' component={SignUp} />
        <Route path='/home' component={Home} />
        <Route path='/product/:id' component={Product} />
        <Route path='/electronics' component={Products} />
        <Route path='/delivery' component={Delivery} />
        <PrivateRoute path='/profile' component={Profile} />
        <Route path='/search/:name' component={Search} />
        <PrivateRoute exact path='/admin' component={Admin} />

        </Switch>
      </Router>

    </div>
  );
}

export default App;
