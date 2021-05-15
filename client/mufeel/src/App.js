import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authAction";
import SignUpPage from "./containers/auth/signup/signUpPage";
import Landing from "./components/layout/landing";
import LoginPage from "./containers/auth/login/loginPage";
import Navbar from "./containers/layout/navBar";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./loginPage";
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
