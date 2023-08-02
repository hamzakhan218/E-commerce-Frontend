import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn"
import SignUp from "./components/Signup/Signup";
  import { ToastContainer } from 'react-toastify';
import Dashboard from "./components/Dashboard/Dashboard";
import Checkout from "./components/Checkout/Checkout";

function App() {

  return (
    <>
      <ToastContainer autoClose={1500} position="top-center" theme="dark" />
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
