import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Header from "./Components/Header";
import PrivateRoute from "./Components/PrivateRoute";
import Upload from "./Components/Upload";
import SecureUpload from "./Components/SecureUpload";
import CreateListing from "./pages/CreateListing";
import ViewListing from "./pages/ViewListing";
import UpdateListing from "./pages/UpdateListing";


function App() {
 console.log('====================================');
 console.log('hello');
 console.log('====================================');

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/secureupload" element={<SecureUpload />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/listing/:id" element={<ViewListing />} />
            <Route path="update-listing/:id" element={<UpdateListing />} />
          </Route>
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
