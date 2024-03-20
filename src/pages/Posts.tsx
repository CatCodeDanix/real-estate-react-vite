import { Button, Link, Pagination } from "@nextui-org/react";
import { Navigate, useSearchParams } from "react-router-dom";

import { usePosts } from "../contexts/PostsContext";
import { useAuth } from "../contexts/AuthContext";

import PostItem from "../components/PostItem";
import { type Post } from "../components/AddPostForm";

const Posts = ({ userOnlyPosts }: { userOnlyPosts?: boolean }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { posts } = usePosts();

  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? +pageParam : 1;
  const currentPageZeroBased = currentPage - 1;

  const targetPosts = userOnlyPosts
    ? posts.filter((post) => post.userId == user?.id)
    : posts;

  // Number of posts to show in a single page
  const numItemsInOnePage = 8;
  const startSliceIndex = currentPageZeroBased * numItemsInOnePage;
  const endSliceIndex = startSliceIndex + numItemsInOnePage;

  // Ensure startSliceIndex and endSliceIndex are within valid bounds
  const startSliceIndexClamped = Math.min(
    startSliceIndex,
    targetPosts.length - 1,
  );
  const endSliceIndexClamped = Math.min(endSliceIndex, targetPosts.length);

  const targetPostsToShowInPage = targetPosts.slice(
    startSliceIndexClamped,
    endSliceIndexClamped,
  );

  function handlePageChange(page: number) {
    setSearchParams({ page: page.toString() });
  }

  if (!userOnlyPosts && startSliceIndex > startSliceIndexClamped) {
    return <Navigate to={"/app"} />;
  }

  if (targetPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="rounded-2xl border-2 border-double p-4 shadow-md">
          آگهی مسکنی برای نمایش وجود ندارد
        </p>
        <Button color="primary" as={Link} href="/app/add-post">
          ایجاد آگهی جدید
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px]">
      <div className="mx-8 mt-8 flex flex-1 flex-wrap items-center justify-center gap-16 pb-16">
        {userOnlyPosts
          ? targetPostsToShowInPage.map((post: Post) => (
              <PostItem key={post.id} {...post} isEditable={true} />
            ))
          : targetPostsToShowInPage.map((post: Post) => (
              <PostItem key={post.id} {...post} />
            ))}
      </div>
      <div className="mb-7 flex items-center justify-center">
        <Pagination
          dir="ltr"
          isCompact
          showControls
          page={currentPage}
          onChange={handlePageChange}
          total={Math.ceil(targetPosts.length / numItemsInOnePage)}
          initialPage={1}
        />
      </div>
    </div>
  );
};

export default Posts;
