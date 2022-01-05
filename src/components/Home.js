import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectName } from "../features/User/userSlice";

function Home() {
  const name = useSelector(selectName);
  const shortend = name ? name.split(" ")[0] : name;

  return (
    <Container>
      Weclome to my slack-clone <span>{shortend}</span>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  span {
    padding-left: 10px;
  }
`;
