import React from 'react';
import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { NavBar } from './components/shared/navbar.component';
import { HomePage } from './pages/home.page';
import { LoginPage } from './pages/login.page';
import { RegisterPage } from './pages/register.page';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route exact path="/login" component={LoginPage}>
        </Route>
        <Route exact path="/signup" component={RegisterPage}>
        </Route>
        <Route component={HomePage}>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
