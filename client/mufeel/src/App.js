import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import SignUp from "./components/auth/signup";
import Landing from "./components/layout/landing";
import LoginPage from "./containers/auth/loginPage";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={LoginPage} />
            <Route path="/login" component={SignUp} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
