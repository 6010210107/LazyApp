// import "./App.css";
import { Navigation, Navbar } from "./components";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Navigation />
    </Router>
  );
}

export default App;
