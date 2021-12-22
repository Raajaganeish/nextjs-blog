import PostContent from "../../components/posts/post-detail/post-content";
import { invokeGetPostsAPI } from "../../Util/posts-api";

function PostDetailPage({ slug, post }) {
  console.log(slug);
  return <PostContent post={post} />;
}

export async function getStaticPaths() {
  const allPostsResultList = await invokeGetPostsAPI();
  const slugIdList = allPostsResultList.map((x) => x.slug);
  const paths = slugIdList.map((slug) => ({
    params: {
      slug: slug,
    },
  }));
  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;
  const allPostsResultList = await invokeGetPostsAPI();
  const post = allPostsResultList.find((x) => x.slug === slug);
  return {
    props: {
      slug,
      post,
    },
  };
}

export default PostDetailPage;
