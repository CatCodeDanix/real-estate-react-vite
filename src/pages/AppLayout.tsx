import { useEffect } from "react";
import { CircularProgress } from "@nextui-org/react";
import { Outlet } from "react-router-dom";

import { usePosts } from "../contexts/PostsContext";

import Container from "../components/Container";
import PageNav from "../components/PageNav";

const AppLayout = () => {
  const { getPosts, loading } = usePosts();

  useEffect(() => {
    getPosts().catch((error) => {
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
