import { BrowserRouter,Routes, Route } from "react-router-dom"
import Login from "./Pages/Login"
import ForgotPassword from "./Pages/ForgotPassword"
import SignUp from "./Pages/SignUp"
import Home from "./Pages/Home"
import './App.css'
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/ForgotPassword" element={<ForgotPassword/>}></Route>
        <Route path="/SignUp" element={<SignUp/>}></Route>
        <Route path="/Home" element={<Home/>}></Route>    
      </Routes>
    </BrowserRouter>
  )
}

export default App
