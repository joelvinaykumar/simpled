import React from "react"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { PrivateRoute, NotFoundPage } from "./components"
import { Home, Login, SignUp, Profile } from './pages'
import './App.css'

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  )
}


export default App;
