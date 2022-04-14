import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UseAuth } from "./custom-hooks";

import {
  Activities,
  LoginOrRegister,
  Routines,
  Nav,
  MyRoutines,
  Home,
  AddActivity,
  EditActivity,
  EditRoutine,
  ModifyRA,
} from "./components";

const App = () => {
  const { isLoggedIn } = UseAuth();
  return (
    <Router>
      <Nav />
      <Switch>
        {isLoggedIn && (
          <>
            <Route exact path="/home" component={Home} />
            <Route exact path="/activities" component={Activities} />
            <Route exact path="/routines" component={Routines} />
            <Route exact path="/myroutines" component={MyRoutines} />
            <Route
              exact
              path="/routines/:routineId/activities"
              component={AddActivity}
            />
            <Route exact path="/routines/:routineId" component={EditRoutine} />
            <Route
              exact
              path="/activities/:activityId"
              component={EditActivity}
            />
            <Route
              exact
              path="/routine_activities/:activityId"
              component={ModifyRA}
            />
            {/* <Route path="/posts/new" component={NewPost} />
            
            <Route path="/posts/:postId/messages/new" component={Message} /> */}
          </>
        )}

        {!isLoggedIn && (
          <>
            <Route exact path="/home" component={Home} />
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
