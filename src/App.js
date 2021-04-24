import './App.css';
import { BrowserRouter,Switch ,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Register from './components/Register'
import Login from './components/Login'
import Alert from './components/Alert'
import PrivateComponent from './components/PrivateComponent'
import ContactState from './context/contact/ContactState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import setAuthToken from './utils/setAuthToken'
if(localStorage.getItem('token')){
  setAuthToken(localStorage.getItem('token'))
}
function App() {
  return (
    <AuthState>
    <ContactState>
      <AlertState>
    <BrowserRouter>
    <div className="App">
    <Navbar/>
    <div className="container">
      <Alert/>
      <Switch>
        <PrivateComponent exact path="/" component={Home}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/Login" component={Login}/>
      </Switch>
    </div>

    </div>
    </BrowserRouter>
    </AlertState>
    </ContactState>
    </AuthState>
  );
}

export default App;
