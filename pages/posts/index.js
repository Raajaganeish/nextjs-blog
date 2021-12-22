import AllPost from "../../components/posts/all-post";
import { invokeGetPostsAPI } from "../../Util/posts-api";

const DUMMY_POST = [
  {
    slug: "getting-started-with-nextJS",
    image: "getting-started-with-nextJS.png",
    title: "getting-started-with-nextJS",
    excerpt:
      "NextJS is the ReactJS Framework for production. It makes building fullstack react apps and ships with built in SSR",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-nextJS2",
    image: "getting-started-with-nextJS.png",
    title: "getting-started-with-nextJS",
    excerpt:
      "NextJS is the ReactJS Framework for production. It makes building fullstack react apps and ships with built in SSR",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-nextJS3",
    image: "getting-started-with-nextJS.png",
    title: "getting-started-with-nextJS",
    excerpt:
      "NextJS is the ReactJS Framework for production. It makes building fullstack react apps and ships with built in SSR",
    date: "2022-02-10",
  },
];
function AllPostPage(props) {
  const { posts } = props;
  return <AllPost posts={posts} />;
}

export async function getStaticProps() {
  const resultList = await invokeGetPostsAPI();
  return {
    props: {
      posts: resultList,
    },
  };
}
export default AllPostPage;
