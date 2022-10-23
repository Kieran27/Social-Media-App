import Head from "next/head";
import HomepageHeader from "../../components/homepageHeader";
import ProfileWidget from "../../components/profileWidget";
import FriendSuggestions from "../../components/friendSuggestions";
import IndividualPost from "../../components/individualPost";
import Comment from "../../components/commentComponents/comment";
import CommentForm from "../../components/commentComponents/commentForm";
import useIndividualPost from "../../hooks/useIndividualPost";
import useGetComments from "../../hooks/useGetComments";
import CommentsContainer from "../../components/commentComponents/commentsContainer";
import EditPostForm from "../../components/postCreation/editPostForm";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";

const IndividualPostPage = () => {
  // Get post_id from router query
  const router = useRouter();
  const post_id = router.query.post_id as string;

  // Custom hooks\
  const { user } = useAuth();
  const { data, isLoading } = useGetComments(post_id);
  const commentsData = data?.data.comments;
  const { individualPost, editFormOpen, toggleEditForm } = useIndividualPost(
    post_id,
    user?.id
  );
  const postData = individualPost.data?.data.post;

  if (individualPost.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Birb Fintech</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomepageHeader />
      <main className="bg-slate-100 min-h-[calc(100vh-72px)] pt-14">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-12 px-5 gap-8 w-full ">
            <ProfileWidget />
            <section className="col-span-full lg:col-span-8 xl:col-span-6 bg-white shadow-xl py-8 rounded-2xl border ">
              {editFormOpen ? (
                <EditPostForm
                  postData={postData}
                  postId={post_id}
                  toggleEditForm={toggleEditForm}
                />
              ) : (
                <IndividualPost
                  postData={postData}
                  postId={post_id}
                  toggleEditForm={toggleEditForm}
                />
              )}
              <CommentForm postId={post_id} />
              <div className="px-5 mt-5">
                <h3 className="mb-4 font-medium text-xl">
                  Comments ({postData?.comments.length})
                </h3>
                <CommentsContainer
                  commentsData={commentsData}
                  postId={post_id}
                />
              </div>
            </section>
            <FriendSuggestions />
          </div>
        </div>
      </main>
    </>
  );
};

export default IndividualPostPage;
