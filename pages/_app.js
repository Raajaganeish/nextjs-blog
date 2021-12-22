// import "../styles/globals.css";
// import Layout from "../components/layout/layout";
//
// function MyApp({ Component, pageProps }) {
//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   );
// }
//
// export default MyApp;

import "../styles/globals.css";
import Layout from "../components/layout/layout";
import Head from "next/head";
import { NotificationContextProvider } from "../store/notification-context";
import store from "../store/store";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { Provider as AuthProvider } from "next-auth/client";
const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps?.session}>
      <Provider store={store}>
        <NotificationContextProvider>
          <Layout>
            <Head>
              <title>Dead Blog!</title>
            </Head>
            <Component {...pageProps} />
          </Layout>
        </NotificationContextProvider>
      </Provider>
    </AuthProvider>
  );
};

const makeStore = (context) => store;
const wrapper = createWrapper(makeStore, { debug: true });

export default wrapper.withRedux(MyApp);
