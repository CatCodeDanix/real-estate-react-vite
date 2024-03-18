import { Routes, Route, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Signup from "./pages/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import AddPost from "./pages/AddPost";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { PostsContextProvider } from "./contexts/PostsContext";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <ThemeContextProvider>
        <AuthProvider>
          <PostsContextProvider>
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
          </PostsContextProvider>
        </AuthProvider>
      </ThemeContextProvider>
    </NextUIProvider>
  );
}

export default App;
