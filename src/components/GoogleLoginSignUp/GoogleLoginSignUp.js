import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./GoogleLoginSignUp.css";
export default function GoogleLoginSignUp({ handleClick }) {
  return (
    <div>
      <div className="or-container">
        <hr class="line" />
        <span class="or">or</span>
        <hr class="line"></hr>
      </div>

      <GoogleOAuthProvider clientId="412263138582-3net4j37bhj5aes9vn522nr6p1qohpoj.apps.googleusercontent.com">
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
  );
}
