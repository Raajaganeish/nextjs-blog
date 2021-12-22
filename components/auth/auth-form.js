import { useRef, useState } from "react";
import classes from "./auth-form.module.css";
import { hashedPassword } from "../../Helpers/bcryptUtils";

function AuthForm(props) {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passInpRef = useRef();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passInpRef.current.value;
    if (isLogin) {
      props.onLoginHandler({ email, password });
    } else {
      props.onRegisterHandler({ email, password });
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passInpRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
