import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const { url, token, setToken, setPageTitle } = useContext(StoreContext);
  const [onLogin, setOnLogin] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const forward = searchParams.get("forward");
  const id = searchParams.get("id");
  const navigate = useNavigate();

  const getUserInfo = async () => {
    const response = await axios.get(url + "/api/user/userinfo", {
      headers: { token: token },
    });
    setUserInfo(response.data.data);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    let response;
    if (onLogin) {
      response = await axios.post(url + "/api/user/login", data);
    } else {
      response = await axios.post(url + "/api/user/register", data);
    }

    if (response.data.success) {
      const token = response.data.token;
      setToken(response.data.token);
      localStorage.setItem("token", token);

      if (forward === "admin") {
        navigate("/admin");
      } else if (forward !== null && forward !== "") {
        navigate(`/admin/${forward}/${id || ""}`);
      } else {
        navigate("/");
      }
    } else {
      console.log(response.data.message);
    }
  };

  useEffect(() => {
    setPageTitle(
      token
        ? "LoggedIn - KhubValoMon.Com"
        : (onLogin ? "Login" : "Register") + " - KhubValoMon.Com"
    );
    if (token) {
      getUserInfo();
    }
  }, [token]);

  if (token) {
    return (
      <div className="login">
        <h3>Logged In</h3>
        <h2>{userInfo?.name}</h2>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("token");
            setToken("");
            navigate("/login");
          }}
        >
          LogOut
        </button>
      </div>
    );
  }

  return (
    <div className="login">
      <button type="button" onClick={() => setOnLogin(!onLogin)}>
        {onLogin ? "Register" : "Login"}
      </button>
      <form onSubmit={handleLogin}>
        {!onLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
        />
        <button type="submit">{onLogin ? "Login" : "Register"}</button>
      </form>
    </div>
  );
};

export default Login;
