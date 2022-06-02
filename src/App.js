import React from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MenuBar from "./components/MenuBar";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MenuBar />

        <div className=" px-5 max-w-6xl lg:mx-auto relative">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route
              exact
              path="/register"
              element={
                <AuthRoute>
                  <Register />
                </AuthRoute>
              }
            />
            {/* <Route exact path="/posts/:postId" element={<SinglePost />} /> */}
            <Route path="/posts/:postId" element={<SinglePost />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
