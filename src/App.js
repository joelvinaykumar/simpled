import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NotFoundPage } from './components';
import { Home, SignUp, Login } from './pages'

function App() {

  return (
    <main>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
