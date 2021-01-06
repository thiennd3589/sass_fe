import CustomButton from "element/Button";
import TextBox from "element/TextBox";
import { Global } from "global";
import { Obj } from "interfaces/common";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { State } from "redux-saga/reducers";
import { logIn, signUp } from "./actions";
import "./styles.scss";

interface LoginState {
  name: { value: string; errorMessage: string; showError: boolean };
  email: { value: string; errorMessage: string; showError: boolean };
  password: { value: string; errorMessage: string; showError: boolean };
  loginEmail: { value: string; errorMessage: string; showError: boolean };
  loginPassword: { value: string; errorMessage: string; showError: boolean };
  enableRedirect: boolean;
}

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState<LoginState>({
    name: {
      value: "",
      errorMessage: "",
      showError: false,
    },
    email: {
      value: "",
      errorMessage: "",
      showError: false,
    },
    password: {
      value: "",
      errorMessage: "",
      showError: false,
    },
    loginEmail: {
      value: "",
      errorMessage: "",
      showError: false,
    },
    loginPassword: {
      value: "",
      errorMessage: "",
      showError: false,
    },
    enableRedirect: false,
  });

  const { loginResult, signUpResult } = useSelector(
    (state: State) => ({
      loginResult: state.loginResult,
      signUpResult: state.signUpResult,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (loginResult) {
      if (loginResult.success) {
        //Save Token
        const loginResponse = loginResult.response as Obj;
        const token = (loginResponse.data as Obj).accessToken as string;
        Global.user.token = token;
        Global.isAuthenticated = true;

        localStorage.setItem("sassToken", token);
        //Redirect;
        history.push("/");
        return;
      } else {
        setState((prevState) => ({
          ...prevState,
          email: {
            ...prevState.email,
            errorMessage: "Your email may be incorrect",
            showError: true,
          },
          password: {
            ...prevState.password,
            errorMessage: "Your password may be incorrect",
            showError: true,
          },
        }));
      }
    } else if (signUpResult) {
      if (signUpResult.success) {
        onLogin();
        return;
      } else {
        setState((prevState) => ({
          ...prevState,
          email: {
            ...prevState.email,
            errorMessage: "Your email may be incorrect",
            showError: true,
          },
          password: {
            ...prevState.password,
            errorMessage: "Your password may be incorrect",
            showError: true,
          },
        }));
      }
    }
  }, [loginResult]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: {
        value: event.target.value,
        showError: false,
        errorMessage: "",
      },
    }));
  };

  const onSignUp = () => {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (re.test(state.email.value) !== true) {
      setState((prevState) => ({
        ...prevState,
        email: {
          ...prevState.email,
          errorMessage: "Your email is invalid",
          showError: true,
        },
      }));
      return;
    }
    if (state.password.value.length < 6) {
      setState((prevState) => ({
        ...prevState,
        password: {
          ...prevState.password,
          errorMessage: "Your password length must be greater than 6",
          showError: true,
        },
      }));
      return;
    }
    dispatch(
      signUp({
        fullname: state.name.value,
        email: state.email.value,
        password: state.password.value,
      })
    );
    setState((prev) => ({ ...prev, enableRedirect: true }));
  };

  const onLogin = () => {
    dispatch(
      logIn({
        email: state.loginEmail.value,
        password: state.loginPassword.value,
      })
    );
  };

  return (
    <div className="Login">
      <div className="FormGroup">
        <div className="LoginForm">
          <h1>Login</h1>
          <div className="Content">
            <TextBox
              name="loginEmail"
              label="Email"
              placeholder="Type your email"
              onChange={onChange}
              value={state.loginEmail.value}
            />
            <TextBox
              name="loginPassword"
              label="Password"
              placeholder="Type your password"
              onChange={onChange}
              type="password"
              value={state.loginPassword.value}
            />
          </div>
          <span>Forgot password?</span>
          <div className="Submit">
            <CustomButton text="LOGIN" onClick={onLogin} />
          </div>
        </div>
        <div className="SignUp">
          <h1>Sign Up</h1>
          <div className="Content">
            <TextBox
              name="name"
              label="Your Full Name"
              placeholder="Type your name"
              onChange={onChange}
              value={state.name.value}
            />
            <TextBox
              name="email"
              label="Email"
              placeholder="Type your email"
              onChange={onChange}
              value={state.email.value}
            />
            <TextBox
              name="password"
              label="Password"
              placeholder="Type your password"
              onChange={onChange}
              value={state.password.value}
              type="password"
            />
          </div>
          <div className="Submit">
            <CustomButton text="SIGN UP" onClick={onSignUp} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
