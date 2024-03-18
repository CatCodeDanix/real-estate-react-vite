import { ReactNode, createContext, useContext, useReducer } from "react";

interface User {
  firstName?: string;
  lastName?: string;
  id?: number | null;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  signup: (userData: User) => Promise<void>;
  login: (userData: User) => Promise<void>;
  logout: () => void;
}

interface AuthContextState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
}

interface SignupAction {
  type: "signup";
  payload: { user: User; accessToken: string };
}
interface LoginAction {
  type: "login";
  payload: { user: User; accessToken: string };
}
interface LogoutAction {
  type: "logout";
}

type ReducerAction = SignupAction | LoginAction | LogoutAction;

interface AuthServerResponseData {
  accessToken: string;
  user: {
    id: number;
  };
}

const AuthContext = createContext<AuthContextValue | null>(null);

const initialState: AuthContextState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
};

function reducer(
  state: AuthContextState,
  action: ReducerAction,
): AuthContextState {
  switch (action.type) {
    case "signup":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
      };
    case "login":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        accessToken: null,
      };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, dispatch] = useReducer(reducer, initialState);

  const { user, isAuthenticated, accessToken }: AuthContextState = authState;

  async function signup(userInfo: User) {
    const res = await fetch("http://localhost:9000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (res.ok) {
      const data: { accessToken: string } =
        (await res.json()) as AuthServerResponseData;
      dispatch({
        type: "signup",
        payload: {
          user: userInfo,
          accessToken: data.accessToken,
        },
      });
    } else {
      throw new Error("Failed to signup");
    }
  }

  async function login(userInfo: User) {
    const res = await fetch("http://localhost:9000/login", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (res.ok) {
      const data: AuthServerResponseData =
        (await res.json()) as AuthServerResponseData;
      console.log("data issss:   ", data.user.id);
      dispatch({
        type: "login",
        payload: {
          user: { email: userInfo.email, id: data.user.id },
          accessToken: data.accessToken,
        },
      });
    } else {
      const data: unknown = await res.json();
      console.log(data);
      throw new Error("Failed to login");
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  const providerValue: AuthContextValue = {
    user,
    isAuthenticated,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined || context === null)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
