import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import CheckAuth from "./components/common/CheckAuth";
import Layout from "./components/common/Layout";
import FAQs from "./pages/faqs";
import About from "./pages/about";
import Contact from "./pages/contact";
import Services from "./pages/services";
import Blogs from "./pages/blogs"
import ScrollToTop from "./components/ScrollToTop";
import ServiceDetails from "./pages/serviceDetails";
import GoToTopButton from "./components/common/GoToTopButton";
import Login from "./pages/login";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/dashboard";
import BlogDetails from "./pages/blogDetails";
import Inbox from "./pages/admin/inbox";
import BlogPost from "./pages/admin/blogPost";

function App() {
  const isAuthenticated = true;
  const user = null;

  return (
    <div className="App">
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetails />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetails />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="blogs" element={<BlogPost />} />
        </Route>

        <Route path="auth/login" element={<Login />} />
      </Routes>

      <GoToTopButton />
    </div>
  );
}

export default App;
