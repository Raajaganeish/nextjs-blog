import { Fragment, useContext, useEffect, useState } from "react";
import MainNavigation from "./main-navigation";
import Notification from "../notification/notification";
import NotificationContext from "../../store/notification-context";
import MainHeader from "./main-header";
import { connect } from "react-redux";
import { onLogoutSubmitHandler } from "../../store/actions/actionCreator";

function Layout(props) {
  const {
    notification: { show, message, status, title },
  } = useContext(NotificationContext);
  const [showEventNavBar, setShowEventNavBar] = useState(false);
  useEffect(() => {
    if (window.location.href.indexOf("event") > -1) {
      setShowEventNavBar(true);
    }
  }, []);
  return (
    <Fragment>
      {showEventNavBar ? (
        <MainHeader />
      ) : (
        <MainNavigation onSignOutHandler={props.onSignOutHandler} />
      )}
      <main>{props.children}</main>
      {show && <Notification title={title} message={message} status={status} />}
    </Fragment>
  );
}

// const Layout = (props) => {
//     const {
//         notification: { show, message, status, title },
//     } = useContext(NotificationContext);
//     return (
//         <Fragment>
//             <MainHeader />
//             <main>{props.children}</main>
//             {show && <Notification title={title} message={message} status={status} />}
//         </Fragment>
//     );
// };

const mapDispatchToProps = (dispatch) => {
  return {
    onSignOutHandler: () => dispatch(onLogoutSubmitHandler()),
  };
};
export default connect(null, mapDispatchToProps)(Layout);
