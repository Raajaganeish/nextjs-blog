import styles from "./all-posts.module.css";
import PostGrid from "./post-grid";

function AllPost(props) {
  const { posts } = props;
  return (
    <section className={styles.posts}>
      <h1>All Posts!</h1>
      <PostGrid posts={posts} />
    </section>
  );
}

export default AllPost;
