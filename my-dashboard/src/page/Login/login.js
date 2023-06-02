import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import classes from "./login.module.css";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./login.css";
import image1 from "./img/Mobile login-pana.svg";
import image2 from "./img/4820-removebg-preview.png";
import image3 from "./img/image3.png";
import Sidebar from "../Sidebar/nav";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  // const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["auth"]);

  const [password, setPassword] = useState("");
  const [activeIndex, setActiveIndex] = useState(1);

  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // const [cookies, setCookie] = useCookies(["name"]);
  const from = location.state?.from?.pathname || "/dashboard";
  const [email, setEmail] = useState("");

  const handleInputFocus = (e) => {
    e.target.classList.add("active");
  };

  const handleInputBlur = (e) => {
    if (e.target.value !== "") return;
    e.target.classList.remove("active");
  };

  const handleToggleClick = () => {
    setActiveIndex(activeIndex === 1 ? 2 : 1);
  };

  const handleBulletClick = (e) => {
    const index = parseInt(e.target.dataset.value);
    setActiveIndex(index);
  };

  useEffect(() => {
    document.title = "Login";
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://idecream-backend.onrender.com/api/user/login",
        {
          email,
          password,
          headers: { "content-type": "application/json" },
          // withCredentials: true,
        }
      );

      //const superadmin = response.data.user.is_super_admin;
      const token = response?.data?.token;
      console.log(response);
      console.log(token);
      setCookie("auth", response.data.token);
      setLoggedIn(true);
      localStorage.setItem("token", token);
      navigate("/dashboard");

      toast.success("Login successful!");

      navigate(from, { replace: true });
    } catch (error) {
      if (!error.response) {
        toast.error("No Internet Connection!");
      } else {
        console.error(error);
        toast.error("Email/Password invalid!");
      }
    }
  };

  return (
    <main>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            <form
              action="index.html"
              autocomplete="off"
              className="sign-in-form"
            >
              <div className="logo">
                <img
                  src={process.env.PUBLIC_URL + "/Assets/Logo-final.png"}
                  alt=""
                  className="logo_edit"
                />
              </div>

              <div className="heading">
                <h2>Welcome Back</h2>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    className="input-field"
                    autocomplete="off"
                    placeholder="email"
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    className="input-field"
                    autocomplete="off"
                    placeholder="password"
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>

                <input
                  type="submit"
                  value="Sign In"
                  className="sign-btn"
                  onClick={handleSubmit}
                />

                <p className="text">
                  Forgotten your password or you login datails?
                  <a href="#">Get help</a> signing in
                </p>
              </div>
            </form>
          </div>

          <div
            className={`carousel ${activeIndex === 2 ? "sign-up-mode" : ""}`}
          >
            <div className="images-wrapper">
              <img
                src={image1}
                className={`image img-1 ${activeIndex === 1 ? "show" : ""}`}
                alt=""
              />
              <img
                src={image2}
                className={`image img-2 ${activeIndex === 2 ? "show" : ""}`}
                alt=""
              />
              <img
                src={image3}
                className={`image img-3 ${activeIndex === 3 ? "show" : ""}`}
                alt=""
              />
            </div>

            <div className="text-slider">
              <div className="text-wrap">
                <div
                  className="text-group"
                  style={{
                    transform: `translateY(${-(activeIndex - 1) * 2.2}rem)`,
                  }}
                >
                  <h2>Hello Boss , ready to start ...</h2>
                  <h2>are you boring ,Boss</h2>
                  <h2>testy some wanderful flavour</h2>
                </div>
              </div>

              <div className="bullets">
                <span
                  className={`active ${activeIndex === 1 ? "active" : ""}`}
                  data-value="1"
                  onClick={handleBulletClick}
                ></span>
                <span
                  className={`${activeIndex === 2 ? "active" : ""}`}
                  data-value="2"
                  onClick={handleBulletClick}
                ></span>
                <span
                  className={`${activeIndex === 3 ? "active" : ""}`}
                  data-value="3"
                  onClick={handleBulletClick}
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

{
  /* 
/* {loggedIn ? (
  <Sidebar />
  ) : (
  <div className={classes.login}>
   
    <div className={classes.loginForm}>
      <div className={classes.formCentered}>
        <h1 className={classes.loginTitle}>LOG IN</h1>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12}>
            <TextField
              className={classes.email}
              type="email"
              name="email"
              placeholder={"Enter your email address"}
              label="Email"
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              className={classes.password}
              type="password"
              name="password"
              placeholder={"Enter your password"}
              label="Password"
              variant="outlined"
              onChange={(event) => setPassword(event.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              variant="contained"
              className={classes.buttonColor}
              fullWidth
              onClick={handleSubmit}
            >
              Log in
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
    
  </div>
)} */
}
export default Login;
