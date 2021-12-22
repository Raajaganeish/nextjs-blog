import styles from "./button.module.css";
import Link from "next/link";
const Button = (props) => {
  const { link, onClick } = props;
  // console.log(props.children);
  if (link) {
    return (
      <Link href={link}>
        <a className={styles.btn}>{props.children}</a>
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={styles.btn}>
      {props.children}
    </button>
  );
};

export default Button;
