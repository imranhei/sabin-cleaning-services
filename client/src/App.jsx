import "./App.css";
import Home from "./pages/home.jsx";
import { Route, Routes } from "react-router-dom";
import CheckAuth from "./components/common/CheckAuth";
import Layout from "./components/common/layout";
import FAQs from "./pages/faqs";

function App() {
  const isAuthenticated = false;
  const user = null;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/faqs" element={<FAQs />} />
        {/* <Route
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Layout />
            </CheckAuth>
          }
        > */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
