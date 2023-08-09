import React, { useState, useEffect, useReducer, useContext,useRef } from "react";


import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "User_Input") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "Input_blur") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "User_Input") {
    return { value: action.val, isValid: action.val.trim().length > 8 };
  }
  if (action.type === "Input_blur") {
    return { value: state.value, isValid: state.value.trim().length > 8 };
  }
  function isValidPassword(password){
    if(!(password.length >= 8 && password.length <= 15)){
        return false;
    }
    let count =0;
    for(let i=0; i<=9;i++){
        if(password (i)== -1){
            count =1;
        }
    }
    if(count === 0){
       return false;
    }
    count=0;
    for(let i=65;i<=90;i++){
        if(password.indexOf(String.fromCharCode(i))!==-1){
            count=1;
        }
    }
    if(count === 0){
        return false;
    }
  
    count = 0;
    for(let i=97;i<=122;i++){
        if(password.indexOf(String.fromCharCode(i))!== -1){
          count = 1;
        }
  }
  if(count===0){
    return false;
  }
  return true;
 }
 
};
const Login = () => {
  /* const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(); */
  /* const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(); */
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);
  const emailInputRef=useRef();
  const passwordInputRef=useRef();

  useEffect(() => {
    console.log("Fffect Running");

    return () => {
      console.log("Effect Clean up");
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking validity");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      console.log("clean up");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "User_Input", val: event.target.value });

    /*  setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    ); */
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "User_Input", val: event.target.value });

    /* setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    ); */
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "Input_blur" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "Input_blur" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid)
    {
      authCtx.onLogin(emailState.value, passwordState.value);
    }else if(!emailIsValid){
      emailInputRef.current.focus();
    }else {
      passwordInputRef.current.focus();
    }
    
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;