import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import Blogs from "./components/blogs/Blogs";
import Form from "./components/form/Form";

export default function App(): JSX.Element {
  return (
    <div> 
      <Router>
        <Routes>
          Stable-diffsuion
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/add" element={<Form />} />
        </Routes>
      </Router>
    </div>
  )
}