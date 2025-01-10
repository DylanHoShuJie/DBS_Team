import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Login/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './Auth'
import User from './Components/Login/User'


function App() {

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/user" element = {<User/>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
