import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, NotFoundPage } from './components';

function App() {
  return (
    <main>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
