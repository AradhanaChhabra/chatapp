import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import io from "socket.io-client";
import Chat from "./components/Chat/Chat";
import { useState, useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(
      io("http://localhost:5000", {
        transports: ["websocket", "polling"],
      })
    );
  }, []);
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("");
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={<Home socket={socket} logOut={logOut} />}
        />
        <Route
          path="/chat/:username/:roomname"
          element={<Chat socket={socket} logOut={logOut} />}
        />
      </Routes>
    </div>
  );
}

export default App;
