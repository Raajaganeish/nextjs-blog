import styles from "./featured-posts.module.css";
import PostGrid from "../posts/post-grid";

function FeaturedPosts(props) {
  const { posts } = props;
  return (
    <section className={styles.latest}>
      <h1>Featured Post</h1>
      <PostGrid posts={posts} />
    </section>
  );
}
export default FeaturedPosts;
