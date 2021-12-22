import Logo from "./logo";
import Link from "next/link";
import styles from "./main-navigation.module.css";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
function MainNavigation(props) {
  const [isAuthNavBar, setAuthNavBar] = useState(false);
  const [session, loading] = useSession();
  console.log(session, loading);
  useEffect(() => {
    if (window.location.href.indexOf("/auth") > -1) {
      setAuthNavBar(true);
    }
  }, []);
  const logoutHandler = () => {
    props.onSignOutHandler();
  };
  return !isAuthNavBar ? (
    <header className={styles.header}>
      <Link href={"/"}>
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href={"/posts"}>Posts</Link>
          </li>
          <li>
            <Link href={"/contact"}>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  ) : (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <div className={styles.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
