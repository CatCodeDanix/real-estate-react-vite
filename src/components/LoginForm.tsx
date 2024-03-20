import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

import { useAuth } from "../contexts/AuthContext";

import CustomInput from "./CustomInput";
import Alert from "./Alert";
import { type Feedback } from "./SignupForm";

interface UserInfo {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    setFeedback(null);

    if (!email || !password) return;

    const userInfo: UserInfo = {
      email,
      password,
    };

    login(userInfo)
      .then(() => {
        navigate("/app");
        setFeedback({ type: "success", text: "با موفقیت وارد شدید!" });
      })
      .catch(() => {
        setFeedback({ type: "danger", text: "خطا! وضعیت شبکه را بررسی کنید." });
      });
  };

  return (
    <>
      <form
        className="m-auto mt-28 flex w-80 flex-col items-center justify-center gap-6 rounded-md px-3 py-7 shadow-2xl"
        onSubmit={handleSubmit}
      >
        <CustomInput
          label="ایمیل"
          placeholder="آدرس ایمیل خود را وارد کنید"
          value={email}
          id="email"
          onValueChange={setEmail}
          type="email"
          isRequired
          isClearable
        />
        <CustomInput
          label="کلمه عبور"
          placeholder="کلمه عبور خود را وارد کنید"
          value={password}
          onValueChange={setPassword}
          id="password"
          isNewPassword={false}
          isPasswordInput={true}
        />
        <Button
          type="submit"
          color="primary"
          disabled={!email || !password}
          className="w-full text-medium font-bold"
        >
          ورود
        </Button>
      </form>
      {feedback ? (
        <Alert
          text={feedback.text}
          type={feedback?.type}
          handleClose={() => setFeedback(null)}
        />
      ) : null}
    </>
  );
};

export default LoginForm;
