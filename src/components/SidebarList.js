import { Delete } from "@mui/icons-material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setChannel } from "../features/Channel/channelSlice";
import db from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectEmail, selectName } from "../features/User/userSlice";

function SidebarList({ title, Icon, creator, addChannel, id, sideEmail }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);
  const shortName = name ? name.split(" ") : name;
  const email = useSelector(selectEmail);

  const MakeChannel = async () => {
    const channelName = prompt("Enter a channel name");

    if (channelName.length < 3) return;

    await addDoc(collection(db, "post"), {
      channelName: channelName,
      email: email,
      timestamp: serverTimestamp(),
      name: shortName[0],
    });
  };

  const SelectChannel = () => {
    if (title || id) {
      dispatch(setChannel({ name: title, id: id }));
      navigate(`/chat/${id}`);
    }
  };

  const deleteSibarChannel = async () => {
    if (email === sideEmail) {
      await deleteDoc(doc(db, "post", id));
    }
  };
  return (
    <Container onClick={addChannel ? MakeChannel : SelectChannel}>
      {Icon && <Icon fontSize="small" styles={{ paddingLeft: 20 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <Div>
          <Span>
            <span>#</span>
            {title}
          </Span>
          <Card>
            <h4>Creator:</h4>
            <h4> {creator}</h4>
          </Card>

          <Deletes onClick={deleteSibarChannel} />
        </Div>
      )}
    </Container>
  );
}

export default SidebarList;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-left: 2px;
  font-size: 12px;
  cursor: pointer;
  padding: 10px 10px;
  transition: all 150ms ease-out;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  h3 {
    color: rgba(119, 84, 119, 255) !important;
    padding-left: 10px;
  }
`;

const Span = styled.div`
  display: flex;
  align-items: center;
  font-size: small;

  span {
    font-size: 15px;
    margin-right: 10px;
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;

  max-height: 20px;
`;

const Card = styled.div`
  position: absolute;
  z-index: 999999;
  background-color: white;
  top: -11px;
  right: 20px;
  left: 50px;
  padding: 5px;
  border-radius: 20px;
  opacity: 0;
  transition: opacity 150ms ease-out;
  display: flex;
  align-items: center;

  h4 {
    margin: 0 1px;
  }
  &:hover {
    opacity: 1;
  }
`;

const Deletes = styled(Delete)`
  height: 1rem !important;
  display: flex;
  justify-content: flex-end;

  :hover {
    color: rgba(239, 68, 68, 1);
  }
`;
