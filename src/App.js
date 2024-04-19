import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../../inotebook/src/component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import NoteState from "./context/NoteState";

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
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
