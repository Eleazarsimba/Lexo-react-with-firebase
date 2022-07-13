import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';

import Resetpass from './components/Actions/Resetpass';
import Titlebar from './components/Dashboard/Titlebar';
import Loginform from './components/Loginform';
import Pagenotfound from './components/Pagenotfound';
import Homepage from './components/Dashboard/Homepage';

import Offers from './components/Dashboard/Offers';
import Theproducts from './components/Dashboard/Theproducts';

function App() {
  return (
    <Router>
        <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/offerhere" component={Offers} />
            <Route exact path="/producthere" component={Theproducts} />
            <Route exact path="/dashboard" component={Titlebar} />
            <Route exact path="/login" component={Loginform} />
            <Route exact path="/resetpass" component={Resetpass} />
            
            <Titlebar />
            <Route path="*" component={Pagenotfound} />
        </Switch>
    </Router>
  );
}

export default App;
