import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import CheckAuth from "./components/common/CheckAuth";
import Layout from "./components/common/Layout";
import FAQs from "./pages/faqs";
import About from "./pages/about";
import Contact from "./pages/contact";
import Services from "./pages/services";
import Blogs from "./pages/blogs";
import ScrollToTop from "./components/ScrollToTop";
import ServiceDetails from "./pages/serviceDetails";
import GoToTopButton from "./components/common/GoToTopButton";
import Login from "./pages/login";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/dashboard";
import BlogDetails from "./pages/blogDetails";
import Inbox from "./pages/admin/inbox";
import AdminBlogForm from "./pages/admin/AdminBlogForm";
import QuoteDetails from "./pages/admin/quoteDetails";
import CalendarEvent from "./pages/admin/calendarEvent";
import Users from "./pages/admin/users";
import Profile from "./pages/admin/profile";
import Register from "./pages/admin/register";
import ChangePassword from "./pages/admin/changePassword";
import AdminBlogList from "./pages/admin/AdminBlogList";
import NotFound from "./pages/NotFound";

function App() {
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
          <Route path="calendar" element={<CalendarEvent />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="inbox/:id" element={<QuoteDetails />} />
          <Route
            path="accepted"
            element={<Inbox status="accepted" title="Accepted Quotes" />}
          />
          <Route path="accepted/:id" element={<QuoteDetails />} />
          <Route
            path="trash"
            element={<Inbox trashed={true} title="Trash" />}
          />
          <Route path="trash/:id" element={<QuoteDetails />} />
          <Route path="blogs" element={<AdminBlogList />} />
          <Route
            path="blogs/create"
            element={<AdminBlogForm mode="create" />}
          />
          <Route
            path="blogs/edit/:blogId"
            element={<AdminBlogForm mode="edit" />}
          />
          <Route path="users" element={<Users />} />
          <Route path="profile" element={<Profile />} />
          <Route path="register" element={<Register />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        <Route path="auth/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <GoToTopButton />
    </div>
  );
}

export default App;
