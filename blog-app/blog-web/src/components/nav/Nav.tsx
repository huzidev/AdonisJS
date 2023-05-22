import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div>
        <Link to="/blogs">Blogs</Link>
        <Link to="/add">Add Blog</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
    </div>
  )
}
