import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

//pages and components
import Teams from './pages/Teams'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Demo from './pages/Demo';

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
          <Routes>
            <Route
              path="/"
              element={<Home/>}
            />
            <Route
              path="/contact"
              element={<Contact/>}
            />
            <Route
              path="/demo" 
              element={<Demo/>}
            />
            <Route 
              path="/teams"
              element={!user ? <Home /> : <Teams/>}
            />
            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to = "/teams" />}
            />
            <Route 
              path="/signup"
              element={!user ? <Signup /> : <Navigate to = "/teams" />}
            />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
