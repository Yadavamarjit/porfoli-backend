import React, { useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import loginPage from "../../assets/loginPage.png";
import loginPage from "../assets/loginPage.png";
import "./SignUpLogin.css";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { debounce, validateField } from "../../utils";
import GoogleLoginSignUp from "../GoogleLoginSignUp/GoogleLoginSignUp";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addUser } from "../../store/userSlice";

// const settings = {
//   dots: false,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 3001,
//   arrows: false,
// };

export default function SignUpLogin() {
  // const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: undefined,
    email: undefined,
    password: undefined,
    confpassword: undefined,
  });

  const [inputErrors, setInputErrors] = useState({
    name: "",
    email: "",
    password: "",
    confpassword: "",
    isAnyError: true,
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const pathname = window.location.pathname.split("/")[1];

  const debouncedValidateField = debounce(validateField, 1000);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    debouncedValidateField(name, value, setInputErrors, userData);
  };

  const inputConfig = [
    {
      name: "name",
      placeholder: "What's your name",
      show: pathname === "signup",
    },
    { name: "email", placeholder: "What's your email address", show: true },
    {
      name: "password",
      placeholder: "Enter a password",
      show: true,
      type: "password",
    },
    {
      name: "confpassword",
      placeholder: "Enter Confirmed password",
      show: pathname === "signup",
      type: "password",
    },
  ];

  const handleClick = async (googleSignin) => {
    if (inputErrors.isAnyError && !googleSignin) return;
    setLoading(true);
    const requestBody = googleSignin ? { ...googleSignin } : { ...userData };
    try {
      console.log({ ...requestBody }, googleSignin);
      const { data } = await axios.post(
        "http://localhost:5000/" + (googleSignin ? "google" : pathname),
        {
          ...requestBody,
        }
        // { withCredentials: true }
      );
      if (data["token"]) {
        localStorage.setItem("token", data["token"]);
        localStorage.setItem("name", data["user"]["name"]);
        localStorage.setItem("email", data["user"]["email"]);
        // dispatch(addUser(data.user));
        navigate("/");
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log("err====", e);
    }
  };

  return (
    <Grid container display={"flex"} flexDirection={"row"} height={"100%"}>
      <Grid
        item
        md="6"
        sm="12"
        xs="12"
        className="login-left-panel"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid className="signup-login-form-container">
          <Grid className="login-signup-header-txt-container">
            <Typography className="login-heading">
              {pathname === "signup"
                ? "Let's Get Started 🚀"
                : "Welcome back 👏"}
            </Typography>
            <Typography className="login-sub-heading">
              {pathname === "signup"
                ? "Sign up your account"
                : "Log in your account"}
            </Typography>
          </Grid>
          {inputConfig.map(
            (input, index) =>
              input.show && (
                <TextField
                  fullWidth
                  className="form-input"
                  key={index}
                  name={input.name}
                  placeholder={input.placeholder}
                  value={userData[input.name]}
                  onChange={handleInput}
                  error={!!inputErrors[input.name]}
                  helperText={inputErrors[input.name]}
                  type={input.type}
                />
              )
          )}
          <LoadingButton
            className="signup-login-btn"
            variant="contained"
            onClick={() => handleClick(false)}
            loading={loading}
          >
            <Typography>{pathname}</Typography>
          </LoadingButton>
          <GoogleLoginSignUp handleClick={handleClick} />
        </Grid>
      </Grid>
      <Grid
        item
        md="6"
        position={"relative"}
        className="signup-login-right-panel"
      >
        <Grid
          className="signup-login-img"
          // style={{ backgroundImage: `url(${loginPage})` }}
        >
          <img src={loginPage} alt="img" />
          {/* <Slider
            {...settings}
            style={{
              zIndex: "99999",
              position: "relative",
              top: "50%",
              left: "50%",
              transform: `translate(-50%,-50%)`,
              //   translate: `transform("-50%")`,
            }}
          >
            {quotes.map((quote, index) => (
              <div className="carousel-slide" key={index}>
                <Typography
                  variant="h4"
                  textAlign={"center"}
                  //   alignSelf={"center"}
                  color={"white"}
                >
                  {quote}
                </Typography>
              </div>
            ))}
          </Slider> */}
        </Grid>
        {/* <div className="img-overlay"></div> */}
      </Grid>
    </Grid>
  );
}
