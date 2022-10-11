import Head from "next/head";
import HomepageHeader from "../../components/homepageHeader";
import PostsContainer from "../../components/postsContainer";
import ProfileWidget from "../../components/profileWidget";
import FriendSuggestions from "../../components/friendSuggestions";
import CreatePostWidget from "../../components/postCreation/createPostWidget";
import CommentForm from "../../components/postCreation/postForm";
import useToggle from "../../hooks/useToggle";
import useCreatePost from "../../hooks/useCreatePost";

const HomePage = () => {
  const { isToggled, toggle } = useToggle();
  // Hook will redirect if user not signed in

  // Custom hooks
  const { posts } = useCreatePost();
  const postData = posts?.data?.data.posts;
  console.log(posts?.data?.data.posts);

  return (
    <>
      <Head>
        <title>Birb Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomepageHeader />
      <main className="bg-slate-100 min-h-[calc(100vh-72px)] pt-14 relative z-0">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-12 px-5 gap-8 w-full ">
            <ProfileWidget />
            <PostsContainer posts={postData} />
            <FriendSuggestions />
          </div>
        </div>
        <CreatePostWidget toggle={toggle} />
        {isToggled && <CommentForm toggle={toggle} />}
      </main>
    </>
  );
};

export default HomePage;
