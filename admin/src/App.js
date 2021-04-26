import "./App.css";
import StudentDashboard from "./Components/StudentDashboard";
import DoorKeerper from "./Components/DoorKeeper";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Admin Panel</Navbar.Brand>
          <Nav className="mr-auto">
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                marginRight: "1rem",
              }}
              to="/"
            >
              Student
            </Link>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/doorKeeper"
            >
              Door Keeper
            </Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route path="/doorKeeper">
            <DoorKeerper />
          </Route>
          <Route path="/requests"></Route>
          <Route path="/">
            <StudentDashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
