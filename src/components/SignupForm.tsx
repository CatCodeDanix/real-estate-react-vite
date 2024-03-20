import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

import { useAuth } from "../contexts/AuthContext";

import Alert from "./Alert";
import CustomInput from "./CustomInput";

export interface Feedback {
  type: "success" | "danger";
  text: string;
}

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const { signup } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    if (!firstName || !lastName || !email || !password) return;

    const userInfo = {
      firstName,
      lastName,
      email,
      password,
    };

    signup(userInfo)
      .then(() => {
        navigate("/app");
        setFeedback({ type: "success", text: "ثبت نام با موفقیت انجام شد" });
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
          label="نام"
          placeholder="نام خود را وارد کنید"
          value={firstName}
          id="firstName"
          onValueChange={setFirstName}
          type="text"
          isRequired
          isClearable
        />
        <CustomInput
          label="نام خانوادگی"
          placeholder="نام خانوادگی خود را وارد کنید"
          value={lastName}
          id="lastName"
          onValueChange={setLastName}
          type="text"
          isRequired
          isClearable
        />
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
          isNewPassword={true}
          isPasswordInput={true}
        />
        <Button
          type="submit"
          color="primary"
          disabled={!firstName || !lastName || !email || !password}
          className="w-full text-medium font-bold"
        >
          ثبت نام
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

export default SignupForm;
