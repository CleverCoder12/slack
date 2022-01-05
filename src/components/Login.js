import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setLogin } from "../features/User/userSlice";
import { auth, provider } from "../firebase/firebase";
function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const SignIn = async () => {
    await signInWithPopup(auth, provider).then((result) => {
      if (loading) return;
      setLoading(true);
      const user = result.user;
      dispatch(
        setLogin({
          name: user.displayName,
          photo: user.photoURL,
          email: user.email,
        })
      );
    });

    setLoading(false);
  };
  return (
    <BackgrounColor>
      <Wrapper>
        <Container>
          <Header>
            <img src="/img/logo.png" alt="" />
          </Header>
          <ButtonContainer>
            <button disabled={loading} onClick={SignIn}>
              {" "}
              {loading ? "signIn" : "Sign in with Google"}
            </button>
          </ButtonContainer>
        </Container>
      </Wrapper>
    </BackgrounColor>
  );
}

export default Login;
const BackgrounColor = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  background-position: center center;

  background-image: url("/img/back.jpg");
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center;

  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 400px;
  width: 400px;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  border-radius: 15px;
`;

const Header = styled.div`
  width: 8rem;
  margin: 0 auto;
  margin-top: 20px;
  animation: Rotate 2s linear infinite;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

const ButtonContainer = styled.div`
  margin-bottom: 30px;
  button {
    padding: 10px 60px;
    border-radius: 20px;
    background-color: rgba(37, 99, 235, 1);
    color: white;
    border: none;
    cursor: pointer;
    font-size: bold;
  }
`;
