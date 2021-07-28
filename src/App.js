// import "./App.css";
import { Navigation, NavigationBar } from "./components";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Navigation />
    </Router>
  );
}

export default App;
