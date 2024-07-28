import React, { useRef, useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import clickOutside from "../../utils/clickOutSide";

const LoginPopup = ({ setShowHide }) => {
  const {
    url,
    userInfo,
    getUserInfo,
    userInfoList,
    token,
    setToken,
    setPageTitle,
    updateUserInfoByOwner,
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const popupRef = useRef(null);
  const [onLogin, setOnLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [targetId, setTargetId] = useState(userInfo._id);
  const [permissions, setPermissions] = useState([]);

  clickOutside(popupRef, () => {
    setShowHide(false);
  });

  useEffect(() => {
    const fetched = userInfoList?.find((user) => user._id === targetId);
    setPermissions(fetched?.permission);
  }, [targetId, userInfoList]);

  useEffect(() => {
    setPageTitle(
      token
        ? "LoggedIn - KhubValoMon.Com"
        : (onLogin ? "Login" : "Register") + " - KhubValoMon.Com"
    );
  }, [token]);

  const handlePermissionChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;

    setPermissions((prevPermissions) => {
      if (checked) {
        return [...prevPermissions, name];
      } else {
        return prevPermissions.filter((perm) => perm !== name);
      }
    });
  };

  const submitPermission = (e) => {
    e.preventDefault();
    updateUserInfoByOwner(targetId, {
      permission: permissions,
    });
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
      setToken(token);
      getUserInfo(token);
      localStorage.setItem("token", token);
      navigate("/admin");
      setShowHide(false);
    } else {
      setMessage(response.data.message);
    }
  };

  return (
    <div className="login-popup" ref={popupRef}>
      {token ? (
        <div className="login-profile">
          <h2>{userInfo?.name}</h2>
          <h3>{userInfo?.email}</h3>
          <br />
          <Stack direction="row" justifyContent="space-between">
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                localStorage.removeItem("token");
                setToken("");
                navigate("/");
              }}
            >
              LogOut
            </Button>
            <Button onClick={() => setShowHide(false)}>Close</Button>
          </Stack>

          <Stack>
            <ul className="my-permissions">
              {userInfo?.permission?.map((perm, index) => (
                <li key={index}>{perm}</li>
              ))}
            </ul>

            <Link to="/admin">Posts and Overviews</Link>
            {userInfo?.permission?.includes("ownership") && (
              <form>
                <label htmlFor="permissions">Permissions</label>
                <select
                  defaultValue={userInfo?._id}
                  onChange={(e) => setTargetId(e.target.value)}
                >
                  {userInfoList?.map((user, index) => (
                    <option value={user._id} key={index}>
                      {user.name}
                    </option>
                  ))}
                </select>

                <div>
                  <input
                    type="checkbox"
                    name="ownership"
                    checked={permissions.includes("ownership")}
                    onChange={handlePermissionChange}
                    disabled={targetId === "66a36962ac666599785e7f7e"}
                  />
                  <label htmlFor="ownership">Ownership</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    name="adminChoice"
                    checked={permissions.includes("adminChoice")}
                    onChange={handlePermissionChange}
                  />
                  <label htmlFor="adminChoice">Admin Choice</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    name="deletePost"
                    checked={permissions.includes("deletePost")}
                    onChange={handlePermissionChange}
                  />
                  <label htmlFor="deletePost">Delete Post</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    name="deleteOverview"
                    checked={permissions.includes("deleteOverview")}
                    onChange={handlePermissionChange}
                  />
                  <label htmlFor="deleteOverview">Delete Overview</label>
                </div>

                <Button
                  type="button"
                  variant="outlined"
                  onClick={submitPermission}
                >
                  Asign
                </Button>
              </form>
            )}
          </Stack>
        </div>
      ) : (
        <div className="login-form">
          <Stack direction="row" justifyContent="space-around">
            <Button
              type="button"
              variant="text"
              onClick={() => setOnLogin(true)}
            >
              Login
            </Button>
            <Button
              type="button"
              variant="text"
              onClick={() => setOnLogin(false)}
            >
              Register
            </Button>
          </Stack>

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
            <b>{message}</b>
            <br />
            <Button type="submit" color="info" variant="contained">
              {onLogin ? "Login" : "Register"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPopup;
