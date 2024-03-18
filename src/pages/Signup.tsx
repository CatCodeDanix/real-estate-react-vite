import Container from "../components/Container";
import PageNav from "../components/PageNav";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <>
      <PageNav />
      <Container>
        <SignupForm />
      </Container>
    </>
  );
};

export default Signup;
