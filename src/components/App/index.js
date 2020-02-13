// == Import : npm
import React from 'react';
import { Route } from 'react-router-dom';
// import { Route } from 'react-router-dom';

// == Import : local
import SignUp from 'src/containers/SignUp';
import ForgottenPassword from 'src/containers/ForgottenPassword';
import Login from 'src/containers/Login';
// import Footer from 'src/components/Footer';
import './app.scss';

// == Composant
const App = () => (
  <div id="app">
    <div>
      <main>
        <Route path="/" exact component={SignUp} />
        <Route path="/Login" exact component={Login} />
        <Route path="/forgotten-password" exact component={ForgottenPassword} />
      </main>
    </div>
    <footer>
      footer
    </footer>
  </div>
);

// == Export
export default App;
