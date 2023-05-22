import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import Nav from "./components/nav/Nav";
import Blogs from "./components/pages/articles/blogs/Blogs";
import Form from "./components/pages/articles/form/Form";
import Update from "./components/pages/articles/update/Update";
import Login from "./components/pages/auth/login/Login";
import Register from "./components/pages/auth/register/Register";

export default function App(): JSX.Element {
  return (
    <div> 
      <Router>
        <Nav />
        <Routes>
          Stable-diffsuion
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