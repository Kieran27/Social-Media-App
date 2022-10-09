import Head from "next/head";
import HomepageHeader from "../../components/homepageHeader";
import ProfileWidget from "../../components/profileWidget";
import FriendSuggestions from "../../components/friendSuggestions";
import IndividualPost from "../../components/individualPost";
import Comment from "../../components/commentComponents/comment";

const IndividualPostPage = () => {
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
              <IndividualPost />
              <div className="px-5 mt-5">
                <h3 className="mb-3 font-medium text-xl">Comments</h3>
                <Comment />
                <Comment />
                <Comment />
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
