import axios from "axios";
import matter from "gray-matter";
export async function invokeGetPostsAPI() {
  const response = await axios.get(
    "https://angular-hhtp-12bcd.firebaseio.com/getPosts.json"
  );
  const { data } = response;
  const postsLists = [];
  for (const key in data) {
    postsLists.push({
      ...data[key],
      slug: key,
    });
  }
  const resultPostsData = postsLists.map((post) => {
    const { mardownText } = post;
    if (mardownText) {
      const { data, content } = matter(mardownText);
      return {
        ...data,
        content,
        slug: post.slug,
      };
    }
    return {
      ...post,
    };
  });
  return resultPostsData;
}
