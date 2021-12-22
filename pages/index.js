import { Fragment } from "react";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { invokeGetPostsAPI } from "../Util/posts-api";
import { increaseCounterAction } from "../store/actions/actionCreator";
import { connect } from "react-redux";
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

function HomePage({ posts, ...rest }) {
  console.log("Printing State Variable");
  console.log(rest);
  return (
    <Fragment>
      <Hero></Hero>
      <FeaturedPosts posts={posts} />
      {/*<h1 onClick={(e) => rest.incrementCounter(5)}>*/}
      {/*  Counter Value is {rest.counter}*/}
      {/*</h1>*/}
    </Fragment>
  );
}

export async function getStaticProps() {
  let postsList = await invokeGetPostsAPI();
  postsList = postsList.filter((post) => post.isFeatured);
  return {
    props: {
      posts: postsList,
    },
  };
}

const mapStateToProps = (state) => {
  console.log(state.appReducer);
  return {
    ...state.appReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementCounter: (data) => dispatch(increaseCounterAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
