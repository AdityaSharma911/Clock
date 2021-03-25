import './App.css';
import Nav from './Components/nav';
import Timer from './Components/timer';
import Clock from './Components/settime'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
      <Nav/>
      <Switch>
      <Route path="/" exact component={Clock} />
      <Route path="/timer" component={Timer} />
      </Switch>
      </Router>
      
    </div>
  );
}



export default App;
