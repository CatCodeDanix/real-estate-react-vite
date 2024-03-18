import { ReactNode, createContext, useContext, useReducer } from "react";
import { type Post } from "../components/AddPostForm";

interface ReducerState {
  posts: Post[] | [];
  loading: boolean;
}

interface PostsProviderValue extends ReducerState {
  getPosts: () => Promise<void>;
  addPost: (post: Post) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  editPost: (post: Post) => Promise<void>;
}

interface ReducerActionPostsGet {
  type: "posts/get";
  payload: Post[];
}
interface ReducerActionPostsAdd {
  type: "posts/add";
  payload: Post;
}
interface ReducerActionPostsDelete {
  type: "posts/delete";
  payload: string;
}
interface ReducerActionPostsEdit {
  type: "posts/edit";
  payload: {
    id: string;
    post: Post;
  };
}
interface ReducerActionLoading {
  type: "loading";
  payload: boolean;
}

type ReducerAction =
  | ReducerActionPostsGet
  | ReducerActionPostsAdd
  | ReducerActionPostsDelete
  | ReducerActionPostsEdit
  | ReducerActionLoading;

const PostsContext = createContext<PostsProviderValue | null>(null);

const initialReducerValue: ReducerState = {
  posts: [],
  loading: false,
};

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case "posts/get":
      return { ...state, posts: action.payload };
      break;
    case "posts/add":
      return { ...state, posts: [...state.posts, action.payload] };
      break;
    case "posts/delete":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id != action.payload),
      };
      break;
    case "posts/edit":
      return {
        ...state,
        posts: [
          ...state.posts.filter((post) => post.id !== action.payload.id),
          action.payload.post,
        ],
      };
      break;
    case "loading":
      return { ...state, loading: action.payload };
    default:
      throw new Error("Unknown action");
      break;
  }
}

export const PostsContextProvider = ({ children }: { children: ReactNode }) => {
  const [{ posts, loading }, dispatch] = useReducer(
    reducer,
    initialReducerValue,
  );

  async function getPosts() {
    dispatch({ type: "loading", payload: true });
    try {
      const res = await fetch("http://localhost:9000/posts");
      if (res.ok) {
        const data = (await res.json()) as Post[];
        dispatch({ type: "posts/get", payload: data });
      } else {
        console.error("Failed:", res.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  async function addPost(post: Post) {
    dispatch({ type: "loading", payload: true });
    try {
      const res = await fetch("http://localhost:9000/posts", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = (await res.json()) as Post;
        dispatch({ type: "posts/add", payload: data });
      } else {
        console.error("Failed:", res.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  async function deletePost(id: string) {
    dispatch({ type: "loading", payload: true });
    try {
      const res = await fetch(`http://localhost:9000/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        dispatch({ type: "posts/delete", payload: id });
      } else {
        console.error("Failed:", res.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  async function editPost(post: Post) {
    dispatch({ type: "loading", payload: true });
    try {
      const res = await fetch(`http://localhost:9000/posts/${post.id}`, {
        method: "PUT",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        dispatch({ type: "posts/edit", payload: { id: post.id!, post } });
      } else {
        console.error("Failed:", res.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  const postsProviderValue: PostsProviderValue = {
    posts,
    getPosts,
    addPost,
    deletePost,
    editPost,
    loading,
  };
  return (
    <PostsContext.Provider value={postsProviderValue}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (context === undefined || context === null) {
    throw new Error("PostsContext was used outside PostsContextProvider");
  }
  return context;
};
