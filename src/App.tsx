import { ComponentType, Suspense, lazy } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import { AuthProvider } from "./contexts/AuthContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { PostsContextProvider } from "./contexts/PostsContext";

type LazyComponent = Promise<{ default: ComponentType<unknown> }>;

const PageNotFound = lazy(
  () => import("./pages/PageNotFound") as LazyComponent,
);
const Homepage = lazy(() => import("./pages/Homepage") as LazyComponent);
const Signup = lazy(() => import("./pages/Signup") as LazyComponent);
const Login = lazy(() => import("./pages/Login") as LazyComponent);
const AppLayout = lazy(() => import("./pages/AppLayout") as LazyComponent);

import ProtectedRoute from "./pages/ProtectedRoute";
import AddPost from "./pages/AddPost";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import FullPageSpinner from "./components/FullPageSpinner";

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <ThemeContextProvider>
        <AuthProvider>
          <PostsContextProvider>
            <Suspense fallback={<FullPageSpinner />}>
              <Routes>
                <Route index path="/" element={<Homepage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Posts />} />
                  <Route path="posts/:id" element={<PostDetails />} />
                  <Route path="posts" element={<Posts />} />
                  <Route
                    path="my-posts"
                    element={<Posts userOnlyPosts={true} />}
                  />
                  <Route path="add-post" element={<AddPost />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </PostsContextProvider>
        </AuthProvider>
      </ThemeContextProvider>
    </NextUIProvider>
  );
}

export default App;
