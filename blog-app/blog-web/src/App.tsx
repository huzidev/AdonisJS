import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import Form from "./components/form/Form";
import Nav from "./components/nav/Nav";
import Blogs from "./components/pages/articles/blogs/Blogs";
import Update from "./components/pages/update/Update";

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
        </Routes>
      </Router>
    </div>
  )
}