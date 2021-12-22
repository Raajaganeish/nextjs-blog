import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/client";

function UserProfile(props) {
  // Redirect away if NOT auth
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setIsLoading(false);
      } else {
        window.location.href = "/auth";
      }
    });
  }, []);

  if (isLoading) {
    return <p className={classes.profile}> Loading !!! </p>;
  }

  const onUpdatePasswordHandler = (data) => {
    props.onUpdatePassworBtnHandler(data);
  };

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onUpdatePasswordHandler={onUpdatePasswordHandler} />
    </section>
  );
}

export default UserProfile;
