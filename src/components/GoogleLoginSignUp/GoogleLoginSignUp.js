import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./GoogleLoginSignUp.css";
export default function GoogleLoginSignUp({ handleClick }) {
  return (
    <div className="google-signin-container">
      <div className="or-container">
        <hr class="line" />
        <span class="or">OR</span>
        <hr class="line"></hr>
      </div>
      <div className="google-btn-container">
        <GoogleOAuthProvider clientId="828906162882-ple0e33qsg4p8dnrjt6jug1grron9f7g.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const { email, given_name: name } = jwtDecode(
                credentialResponse.credential
              );
              console.log(credentialResponse);
              handleClick({ email, name });
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}
