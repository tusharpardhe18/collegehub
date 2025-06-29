import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostForm from "./pages/PostForm";
import ViewPost from "./pages/ViewPost";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<PostForm />} />
        <Route path="/post/:id" element={<ViewPost />} />
      </Routes>
    </Router>
  );
}

export default App;
