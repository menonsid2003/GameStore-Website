import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inventory from "./pages/Inventory";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Single from './pages/Single';
import Add from './pages/Add';
import Employees from './pages/Employees';
import "./style.scss";
import PostCheckout from './pages/PostCheckout';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Inventory />
      <Footer className='footer' />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: "/game/:id",
        element: <Single />
      },
      {
        path: '/inventory',
        element: <Inventory />
      },
    ]
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/add",
    element: <Add />
  },
  {
    path: "/employees",
    element: <Employees />
  },
  {
    path: "/postcheckout",
    element: <PostCheckout />
  },
]);

function App() {
  return (
    <div className="App">
      <div className='container'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
};



export default App;

/*
<BrowserRouter>
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
 */