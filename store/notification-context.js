import { createContext, useEffect, useState } from "react";

const NotificationContext = createContext({
  notification: {
    show: false,
    title: null,
    message: null,
    status: null,
  },
  hideNotification: () => {},
  showNotification: () => {},
});
export default NotificationContext;

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState({
    show: false,
    title: null,
    message: null,
    status: null,
  });
  const showNotification = (notification) => {
    setNotification(notification);
  };
  const hideNotification = () => {
    setNotification({
      show: false,
      title: null,
      message: null,
      status: null,
    });
  };
  useEffect(() => {
    if (
      notification.show &&
      (notification.status === "success" || notification.status === "error")
    ) {
      const timer = setTimeout(() => {
        hideNotification();
      }, 3500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification.show, notification.status]);
  const value = {
    notification,
    showNotification,
    hideNotification,
  };
  return (
    <NotificationContext.Provider value={value}>
      {props.children}
    </NotificationContext.Provider>
  );
};
