import Image from "next/image";
import styles from "./post-header.module.css";
function PostHeader(props) {
  const { title, image, slug } = props;
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <Image src={`/images/posts/${slug}/${image}`} width={400} height={300} />
    </header>
  );
}

export default PostHeader;
