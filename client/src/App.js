import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./App.module.css";

import Room from "./components/Room/Room";
import Home from "./Home";

function App() {
  return (
    <div className={styles.appContainer}>
      <Router>
        <Switch>
          <Route path="/r/:roomId">
            <Room />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
