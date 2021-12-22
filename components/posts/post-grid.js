import PostItem from "./post-item";
import styles from "./posts-grid.module.css";
function PostGrid(props) {
  const { posts } = props;
  return (
    <ul className={styles.grid}>
      {posts?.map((post) => (
        <PostItem post={post} key={post.slug} />
      ))}
    </ul>
  );
}
export default PostGrid;
