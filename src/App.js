import './style/Global.css';
import Nav from './components/Nav';
import Profile from './pages/Profile';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Resources } from './pages/Resources';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthenticatedComponent, useAuthContext } from '@asgardeo/auth-react';
import { Settings } from './pages/Settings';

function App() {

    const { state } = useAuthContext();

  return (
    <Router>
      <div className='App'>
        {
            state?.isAuthenticated
            && <Nav></Nav>
        }
        <Routes>
          <Route path='/' element={ <Home/> } />
          <Route
            path='/profile'
            element={
              <AuthenticatedComponent
                  fallback={ <Home/> }
              >
                  <Profile />
              </AuthenticatedComponent> 
            } />
          <Route
            path='/resource'
            element={ 
              <AuthenticatedComponent
                fallback={ <Home/> }
              >
                <Resources />
              </AuthenticatedComponent>
              }
          />
          <Route
            path='/settings'
            element={ 
              <AuthenticatedComponent
                fallback={ <Home/> }
              >
                <Settings />
              </AuthenticatedComponent>
            }
          />
          <Route path='*' element={ <NotFound /> } />
        </Routes>
        <Footer/>
      </div>
    </Router>
  ); 
}

export default App;
