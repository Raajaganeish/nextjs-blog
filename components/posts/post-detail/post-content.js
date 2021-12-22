import PostHeader from "./post-header";
import styles from "./post-content.module.css";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const DUMMY_POST = {
  slug: "getting-started-with-nextJS",
  image: "getting-started-with-nextJS.png",
  title: "getting-started-with-nextJS",
  excerpt:
    "NextJS is the ReactJS Framework for production. It makes building fullstack react apps and ships with built in SSR",
  date: "2022-02-10",
  content: "# This is a first post",
};
function PostContent(props) {
  const { post } = props;
  const { title, image, date, excerpt, content, slug } = post;
  console.log(content);
  const customRenderers = {
    // img: (image) => {
    //   return <Image src={image.src} alt={image.alt} height={400} width={800} />;
    // },
    p: (paragraph) => {
      const { node } = paragraph;
      // console.log(node);
      if (node.children[0].tagName === "img") {
        const otherChildren = paragraph.children.slice(1);
        console.log(otherChildren);
        const { src, alt } = node.children[0].properties;
        return (
          <>
            <div className={styles.image}>
              <Image src={src} alt={alt} height={400} width={800} />
            </div>
            {otherChildren}
          </>
        );
      }
      return <p>{paragraph.children}</p>;
    },
    code: (code) => {
      // console.log(code);
      const { children, className } = code;
      const language = className.split("-")[1];
      return (
        <SyntaxHighlighter
          language={language}
          style={a11yDark}
          children={children}
        />
      );
    },
  };
  return (
    <article className={styles.content}>
      <PostHeader title={title} image={image} slug={slug} />
      <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
