import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import Checkout from "./components/Checkout/Checkout";
import Dashboard from "./components/Dashboard/Dashboard";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/Signup/Signup";
import store from "./store";
import SingleProduct from "./components/Products/SingleProduct";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer autoClose={1500} position='top-center' theme='dark' />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/product/:id' element={<SingleProduct />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
