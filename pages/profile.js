import UserProfile from "../components/profile/user-profile";
import { getSession } from "next-auth/client";
import { connect } from "react-redux";
import { onUpdatePasswordHandler } from "../store/actions/actionCreator";
function ProfilePage(props) {
  return <UserProfile {...props} />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePassworBtnHandler: (data) =>
      dispatch(onUpdatePasswordHandler(data)),
  };
};

export default connect(null, mapDispatchToProps)(ProfilePage);
