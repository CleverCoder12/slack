import {
  Add,
  ExpandLess,
  Home,
  Inbox,
  InsertComment,
} from "@mui/icons-material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import db from "../firebase/firebase";
import SidebarList from "./SidebarList";

function Slidebar() {
  const [siderbarSate, setSiderBarState] = useState([]);
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "post"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setSiderBarState(snapshot.docs);
      }
    );
  }, [siderbarSate]);

  return (
    <Container>
      <Header>
        <Heading>Coding Community</Heading>
        <Circle>
          <Adds />
        </Circle>
      </Header>
      <Link style={{ color: "rgba(119, 84, 119, 255)" }} to="/">
        {" "}
        <SidebarList Icon={Home} title="Home" />
      </Link>
      <SidebarList Icon={InsertComment} title="Threads" />
      <SidebarList Icon={Inbox} title="Mentions & reactions" />
      <SidebarList Icon={ExpandLess} title="Show less" />
      <Bar />
      <SidebarList Icon={Add} title="Add channel" addChannel />
      <SidebarContainer>
        {siderbarSate.map((post) => (
          <SidebarList
            key={post?.id}
            id={post?.id}
            title={post?.data().channelName}
            creator={post?.data().name}
            sideEmail={post?.data().email}
          />
        ))}
      </SidebarContainer>
    </Container>
  );
}

export default Slidebar;
const Container = styled.div`
  background-color: rgba(63, 14, 64, 255);
  height: 90.8vh;
  display: flex;
  color: rgba(119, 84, 119, 255);

  flex-direction: column;
`;

const Heading = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const Header = styled.div`
  padding: 10px;
  border: 1px solid rgba(82, 38, 83, 255);
  display: flex;
  flex-direction: row;
  align-items: center;

  justify-content: space-between;
`;

const Adds = styled(Add)`
  background-color: white;
  height: 10px;
  width: 10px;
  border-radius: 20px;
  border: 1px solid black;
`;

const Circle = styled.div`
  background-color: white;
  height: 50px;
  cursor: pointer;
  width: 50px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

const Bar = styled.div`
  width: 100%;
  margin-top: 15px;
  border-bottom: 2px solid rgba(119, 84, 119, 255);
`;

const SidebarContainer = styled.div`
  overflow-y: auto;
  margin-top: 10px;
`;
