import Container from "../components/Container";
import LoginForm from "../components/LoginForm";
import PageNav from "../components/PageNav";

const Login = () => {
  return (
    <>
      <PageNav />
      <Container>
        <LoginForm />
      </Container>
    </>
  );
};

export default Login;
