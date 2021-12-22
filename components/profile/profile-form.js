import classes from "./profile-form.module.css";
import { useRef } from "react";

function ProfileForm(props) {
  const newPassword = useRef();
  const oldPassword = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      newPassword: newPassword.current.value,
      oldPassword: oldPassword.current.value,
    };
    props.onUpdatePasswordHandler(data);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPassword} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPassword} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
