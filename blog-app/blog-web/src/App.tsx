import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import Nav from "./components/nav/Nav";
import Form from "./components/pages/articles/BlogForm/index";
import Update from "./components/pages/articles/BlogUpdate/index";
import Blogs from "./components/pages/articles/BlogView/index";
import Login from "./components/pages/auth/UserLogin";
import Register from "./components/pages/auth/UserRegister";

export default function App(): JSX.Element {
  return (
    <div> 
      <Router>
        <Nav />
        <Routes>
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/add" element={<Form />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  )
}