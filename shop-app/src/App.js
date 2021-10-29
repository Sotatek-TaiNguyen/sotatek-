import React from "react";
import { BrowserRouter, Switch, Route, NavLink, Redirect } from "react-router-dom"
import { useLocation, withRouter } from 'react-router-dom';

import Login from "./components/login";
import Header from "./components/header";
import MainContent from "./components/mainContent";
import OrderProduct from "./components/orderProduct"
import Profile from "./components/listOrder"
import './App.css';
import { connect } from "react-redux"

function App(props) {
  // const [user, setUser] = useState({});
  // // const user = props.usernameRedux[0].user || {}
  var routes = (

    <BrowserRouter>
      <div className="header">
        <NavLink exact activeClassName="active" to="/">Home
        </NavLink>
        <NavLink activeClassName="active" to="/login">Login <small>(Must ogin to make order) </small>
        </NavLink>
        <NavLink activeClassName="active" to="/product">Product <small> </small>
        </NavLink>
      </div>
      <div className="content">
        <Switch>
          <Route exact path="/" component={MainContent} />
          <Route path="/products" component={MainContent} />
          <Route path="/login" component={Login} />

          <Redirect to="/products" />
        </Switch>
      </div>
    </BrowserRouter>

  );
  //check login state  in redux 
  if (props.usernameRedux[0]) {
    routes = (
      <BrowserRouter>
        <div className="header">
          <NavLink exact activeClassName="active" to="/">Home
          </NavLink>
          {/* <NavLink activeClassName="active" to="/login">Logout <small> </small>
          </NavLink> */}
          <NavLink activeClassName="active" to={`/order/${props.usernameRedux[0].user.userId}`}> Profile <small>click to see info and order detail </small>
          </NavLink>
          <NavLink activeClassName="active" to="/product">Product <small> reload to log out  </small>
          </NavLink>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component={MainContent} />
            <Route path={`/order/:userId`} component={Profile} />
            <Route exact path="/products" component={MainContent} />
            <Route exact path="/products/:productsId/order" component={OrderProduct} />
            <Route path="/login" component={Login} />
            <Redirect to="/products" />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
  return (
    <div className=" container">
      <Header />
      {routes}
    </div>
  );
}
function mapStateToProps(state) {
  return { usernameRedux: state.users }
}

export default connect(mapStateToProps)(App);
