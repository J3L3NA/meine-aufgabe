import '../App.css';
import Login from './Login';
import Courses from './Courses';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/courses">
            <Courses />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
