import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectName, selectPhoto } from "../features/User/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";

function Header() {
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  const shortName = name ? name.split(" ") : name;
  const photo = useSelector(selectPhoto);
  const SignOut = async () => {
    await signOut(auth).then(
      dispatch({ name: null, email: null, photo: null })
    );
  };
  return (
    <Wrapper>
      <Container>
        <Nav>
          <Left>
            <Link to="/">
              <img src="/img/header-logo.png" alt="" />
            </Link>
          </Left>
          <Center>
            <InputContainer>
              <Searchs />
              <input type="text" />
            </InputContainer>
          </Center>
          <Right>
            <Avatars src={photo} onClick={SignOut} />
            <span>{shortName[0]}</span>
          </Right>
        </Nav>
      </Container>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  background-color: rgba(53, 13, 54, 255);
  padding: 10px 0;
`;
const Container = styled.div`
  max-width: 1124px;
  margin: 0 auto;
  background-color: "black";
`;
const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Left = styled.div`
  width: 2.2rem;
  animation: Rotate 1s linear infinite;
  margin: 0 5px;
  @media (min-width: 765px) {
    margin: 0 15px;
  }

  img {
    width: 100%;
    object-fit: contain;
    animation: rotate 2s linear infinite;
  }

  @media (min-width: 765px) {
    margin: 0;
  }
  cursor: pointer;

  a {
    font-weight: 700;
  }
`;
const Center = styled.div`
  display: none;
  @media (min-width: 1024px) {
    display: inline-flex;
    align-items: center;
    width: 100%;
  }
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  margin: 0 auto;
  border-radius: 20px;
  background-color: rgba(93, 61, 94, 255);
  input {
    flex: 1;
    margin: 0 2px;
    border: none;
    background-color: transparent;
    font-weight: 700;
    color: white;
    :focus {
      outline: none;
    }
  }
`;

const Searchs = styled(SearchIcon)`
  pointer-events: none;
  color: rgba(107, 114, 128, 1);
  margin-left: 2px;
`;

const Avatars = styled(Avatar)`
  transition: opacity 150ms ease-out;
  cursor: pointer;
  :hover {
    opacity: 0.75;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  span {
    font-weight: 700;
    color: #fcfafc;
    border-radius: 20px;
    cursor: pointer;
    font-size: 15px;
    margin: 5px;
    @media (min-width: 765px) {
      margin-left: 10;
    }
    transition: opacity 150ms ease-out;
    @media (min-width: 1024px) {
      margin-left: 10px;
    }

    :hover {
      opacity: 0.75;
    }
  }
`;
