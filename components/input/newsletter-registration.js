import classes from "./newsletter-registration.module.css";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const emailEleRef = useRef();
  const { showNotification, hideNotification } =
    useContext(NotificationContext);
  const [registeredResponse, setRegisteredResponse] = useState(null);
  function registrationHandler(event) {
    event.preventDefault();
    const emailId = emailEleRef.current.value;

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    showNotification({
      show: true,
      title: "Waiting",
      message: "Registering",
      status: "pending",
    });
    axios
      .post(
        "/api/registerNewsLetter",
        { emailId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const { data } = res;
        setRegisteredResponse(data);
        showNotification({
          show: true,
          title: "Success!",
          message: data?.message || "Email has been registered",
          status: "success",
        });
      })
      .catch((error) => {
        const {
          response: { data },
        } = error;
        setRegisteredResponse(data);
        showNotification({
          show: true,
          title: "Failure!",
          message: data?.message || "Email has been registered",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailEleRef}
            required={true}
          />
          <button>Register</button>
        </div>
      </form>
      <p>{registeredResponse && registeredResponse.message}</p>
    </section>
  );
}

export default NewsletterRegistration;
