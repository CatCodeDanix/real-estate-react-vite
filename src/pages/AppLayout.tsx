import { Outlet } from "react-router-dom";
import Container from "../components/Container";
import PageNav from "../components/PageNav";
import { usePosts } from "../contexts/PostsContext";
import { useEffect } from "react";
import { CircularProgress } from "@nextui-org/react";

const AppLayout = () => {
  const { getPosts, loading } = usePosts();

  useEffect(() => {
    getPosts()
      .then(() => {
        console.log("Posts are loaded!");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <PageNav />
      <Container>
        {loading ? (
          <CircularProgress size="lg" aria-label="Loading..." />
        ) : (
          <Outlet />
        )}
      </Container>
    </>
  );
};

export default AppLayout;
