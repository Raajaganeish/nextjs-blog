import { useState, useEffect, useContext } from "react";

import classes from "./contact-form.module.css";
import axios from "axios";
import NotificationContext from "../../store/notification-context";

function ContactForm() {
  const { showNotification, hideNotification } =
    useContext(NotificationContext);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    showNotification({
      show: true,
      title: "Pending",
      message: "Submitting",
      status: "pending",
    });
    const postData = {
      email: enteredEmail,
      name: enteredName,
      message: enteredMessage,
    };

    axios
      .post("/api/contactFormAPI", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { data } = response;
        showNotification({
          show: true,
          title: "Success",
          message: data?.message || "Comment Submitted successFully!",
          status: "success",
        });
      })
      .catch((error) => {
        const { response: data } = error;
        console.log(data);
        showNotification({
          show: true,
          title: "Pending",
          message: data?.message || "Comment Submitted successFully!",
          status: "error",
        });
      });
  };

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            required
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;
