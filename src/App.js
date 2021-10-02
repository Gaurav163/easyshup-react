import { Route, Switch } from "react-router-dom";
import "./App.css";
import Cart from "./components/cart";
import Home from "./components/home";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Regsiter from "./components/register";
import Verify from "./components/verify";

function App() {
  return (
    <div>
      <Navbar />

      <Switch>
        <Route path="/register" component={Regsiter} />
        <Route path="/login" component={Login} />
        <Route path="/cart" component={Cart} />
        <Route path="/verify" component={Verify} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
