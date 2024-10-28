import React, { useState } from "react";
import "../Css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
export default function Login() {
  const [login, setLogin] = useState({ password: "", username: "" });
  const navigate = useNavigate();
  const handelSumbit = async (e) => {
    e.preventDefault();

    if (login?.password && login?.username) {
      const token = await axios.post("/login", login);
      sessionStorage.setItem("token", token.data.token);
      toast("Login was successful", { type: "success" });
      setTimeout(() => {
        navigate("/");
      }, 900);
    } else {
      console.log("Something went wrong");
      toast("User not found", { type: "error" });
    }
  };
  return (
    <div className="login">
      <form className="form" onSubmit={(e) => handelSumbit(e)}>
        <span id="login-lable">Login</span>
        <input
          className="input"
          type="text"
          placeholder="UserName"
          onChange={(e) =>
            setLogin((old) => ({ ...old, username: e.target.value }))
          }
        />
        <input
          className="input"
          type="text"
          placeholder="PassWord"
          onChange={(e) =>
            setLogin((old) => ({ ...old, password: e.target.value }))
          }
        />
        <button id="btn">Submit</button>
      </form>
    </div>
  );
}
