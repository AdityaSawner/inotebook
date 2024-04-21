import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../../inotebook/src/component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import NoteState from "./context/NoteState";
import Login from "./component/Login";
import Signup from "./component/Signup";

function App() {
  return (
    <>
  
      <NoteState>
        <Router>
          <div>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes> 
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
