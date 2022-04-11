import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UseAuth } from "./custom-hooks";

import { Activities, LoginOrRegister, Routines, Nav, Me } from "./components";

const App = () => {
  const { isLoggedIn } = UseAuth();
  return (
    <Router>
      <Nav />
      <Switch>
        {isLoggedIn && (
          <>
            <Route exact path="/activities" component={Activities} />
            <Route exact path="/routines" component={Routines} />
            <Route exact path="/me" component={Me} />
            {/* <Route path="/posts/new" component={NewPost} />
            
            <Route path="/posts/:postId/messages/new" component={Message} /> */}
          </>
        )}

        {!isLoggedIn && (
          <>
            <Route exact path="/activities" component={Activities} />
            <Route exact path="/routines" component={Routines} />
            <Route exact path="/login" component={LoginOrRegister} />
            <Route exact path="/register" component={LoginOrRegister} />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;
