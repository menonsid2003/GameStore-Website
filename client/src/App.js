import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet, } from "react-router-dom";
//BrowserRouter, Routes, Route, 
import Inventory from "./pages/Inventory";
//import Add from "./pages/Add";
//import Update from "./pages/Update";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Single from './pages/Single';
import "./style.scss";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Inventory />
      <Footer />
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