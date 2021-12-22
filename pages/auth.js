import AuthForm from "../components/auth/auth-form";
import { connect } from "react-redux";
import {
  onLoginSubmitHandler,
  onRegisterSubmitHandler,
} from "../store/actions/actionCreator";
function AuthPage(props) {
  return <AuthForm {...props} />;
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onRegisterHandler: (data) => dispatch(onRegisterSubmitHandler(data)),
    onLoginHandler: (data) => dispatch(onLoginSubmitHandler(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
