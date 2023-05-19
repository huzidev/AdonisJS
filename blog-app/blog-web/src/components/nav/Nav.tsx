import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div>
        <Link to="/blogs">Blogs</Link>
        <Link to="/add">Add Blog</Link>
    </div>
  )
}
