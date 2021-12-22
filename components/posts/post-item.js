import styles from "./post-item.module.css";
import Link from "next/link";
import Image from "next/image";
function PostItem(props) {
  console.log(props.post);
  const { title, date, excerpt, image, slug } = props.post;
  const readableDate = new Date(date).toGMTString();
  return (
    <li className={styles.post}>
      <Link href={`/posts/${slug}`}>
        <a>
          <div className={styles.image}>
            <Image
              src={`/images/posts/${slug}/${image}`}
              alt={title}
              width={300}
              height={200}
              layout={"responsive"}
            />
          </div>
          <div className={styles.content}>
            <h3>{title}</h3>
            <time>{readableDate}</time>
            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default PostItem;
