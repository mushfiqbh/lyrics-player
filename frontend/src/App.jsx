import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Search from "./pages/Search/Search";
import AtoZ from "./pages/AtoZ/AtoZ";
import Overview from "./pages/Overview/Overview";
import Post from "./pages/Post/Post";
import Admin from "./pages/Admin/Admin";
import CreatePost from "./components/AdminCreatepost/CreatePost";
import AddOverview from "./components/AddOverview/AddOverview";
import AboutUs from "./pages/AboutUs/AboutUs";
import Login from "./pages/Login/Login";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/overview" element={<AtoZ />} />
        <Route path="/overview/:label" element={<Overview />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/post" element={<CreatePost />} />
        <Route path="/admin/post/:postId" element={<CreatePost />} />
        <Route path="/admin/overview" element={<AddOverview />} />
        <Route path="/admin/overview/:overviewId" element={<AddOverview />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

// const [subDomain, setSubDomain] = useState(null);
// useMemo(() => {
//   const host = window.location.host;
//   const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : -2);
//   if (arr.length > 0) setSubDomain(arr[0]);
// }, []);
