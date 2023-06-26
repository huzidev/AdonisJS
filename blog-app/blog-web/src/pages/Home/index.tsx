import { Link } from "react-router-dom";
import { useAuth } from "store/auth";

export default function HomePage() {
  const auth = useAuth();
  const user = auth.state.user;
  return (
    <div>
      <div 
          className="w-11/12 my-8 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="p-5">
            <h1 className="mb-2 text-3xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
              Welcome {user ? `${user.username}` : "To Blog App"}
            </h1>
             <main className="container mx-auto py-8">
              <section className="mb-8">
                <h2 className="text-2xl text-gray-900 dark:text-white font-bold mb-4">Introduction</h2>
                <p className="text-lg text-gray-700 dark:text-gray-400">
                  This blog app is built using Adonis, React, Redux, TypeScript, MySQL, and NodeJS.
                </p>
              </section>
              <section className="mb-8">
                <h2 className="text-2xl text-gray-900 dark:text-white font-bold mb-4">Key Features</h2>
                <ul className="list-disc list-inside">
                  <li className="text-lg text-gray-700 dark:text-gray-400 mb-2">User Registration and Authentication</li>
                  <li className="text-lg text-gray-700 dark:text-gray-400 mb-2">Blog Post Creation and Management</li>
                  <li className="text-lg text-gray-700 dark:text-gray-400 mb-2">Responsive Design</li>
                </ul>
              </section>
              <section className="mb-8">
                {!user ? (
                  <>
                    <h2 className="text-2xl text-gray-900 dark:text-white font-bold mb-2">Get Started</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-400 mb-4">Sign up to start creating your own blog posts or explore existing posts.</p>
                    <Link
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                      to="/user/sign_up">
                        Sign Up
                      </Link>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl text-gray-900 dark:text-white font-bold mb-4">Explore Blogs</h2>
                      <Link
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                      to="/blogs">
                        Blogs
                      </Link>
                  </>
                )}
              </section>
            </main>
          </div>
        </div>
    </div>
  )
}
