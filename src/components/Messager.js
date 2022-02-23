import { Avatar } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectChannelId } from "../features/Channel/channelSlice";
import { selectEmail } from "../features/User/userSlice";
import db from "../firebase/firebase";

function Messager({ caption, username, email, photo, id }) {
  const originalEmail = useSelector(selectEmail);
  const channelId = useSelector(selectChannelId);
  const OriginalEmail = useSelector(selectEmail);

  const delteMessages = async () => {
    if (email === OriginalEmail) {
      await deleteDoc(doc(db, "post", channelId, "message", id));
    } else {
      return;
    }
  };

  let user = originalEmail === email;
  return (
    <MessageContainer>
      <Wrapper user={user}>
        <MessageWrapper onClick={delteMessages} user={user}>
          {caption}
        </MessageWrapper>

        <AvatarContainer user={user}>
          <Avatar src={photo ? photo : username} alt={username} />
        </AvatarContainer>
        <UserNameWrapper user={user}>{username}</UserNameWrapper>
      </Wrapper>
    </MessageContainer>
  );
}

export default Messager;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
  justify-content: ${(props) => props.user && "flex-end"};
`;

const AvatarContainer = styled.div`
  height: 2rem;
  width: 2rem;
  order: ${(props) => props.user && "9999999"};
  position: relative;
`;

const MessageWrapper = styled.div`
  display: flex;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: all 150ms ease-out;
  cursor: pointer;
  :hover {
    opacity: 0.75;
  }
  border-bottom-right-radius: ${(props) => props.user && "0px"};
  font-weight: 600;
  background-color: ${(props) =>
    props.user ? "rgba(96, 165, 250,1)" : "rgba(78, 222, 222, 1)"};
`;

const UserNameWrapper = styled.p`
  position: absolute;
  font-size: 0.75rem;
  line-height: 1rem;
  bottom: -1.25rem;
  color: ${(props) =>
    props.user ? "rgba(96 , 165, 250, 1)" : "rgba(78, 222, 222, 1)"};
`;

const MessageContainer = styled.div`
  padding: 1rem;
`;
