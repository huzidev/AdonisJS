import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import Blogs from "./components/blogs/Blogs";
import Form from "./components/form/Form";
import Nav from "./components/nav/Nav";
import Update from "./components/update/Update";

export default function App(): JSX.Element {
  return (
    <div> 
      <Router>
        <Nav />
        <Routes>
          Stable-diffsuion
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/add" element={<Form />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </Router>
    </div>
  )
}