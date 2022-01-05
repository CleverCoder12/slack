import styled from "styled-components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import {
  selectChannelId,
  selectChannelName,
} from "../features/Channel/channelSlice";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import db from "../firebase/firebase";
import {
  selectEmail,
  selectName,
  selectPhoto,
} from "../features/User/userSlice";
import Messager from "./Messager";
import { useNavigate } from "react-router-dom";

function Chat() {
  const [portfo, setPortfo] = useState([]);
  const [input, setInput] = useState("");
  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  const [loading, setLoading] = useState(false);
  const name = useSelector(selectName);
  const shortName = name ? name.split(" ") : name;
  const photo = useSelector(selectPhoto);
  const email = useSelector(selectEmail);
  const navigate = useNavigate();
  const scrollref = useRef(null);

  const Submit = async (e) => {
    e.preventDefault();
    if (input.length <= 0) return;

    if (loading) return;
    setLoading(true);

    await addDoc(collection(db, "post", channelId, "message"), {
      input: input,
      username: shortName[0],
      photo: photo,
      email: email,
      timestamp: serverTimestamp(),
    });

    setInput("");
    setLoading(false);
  };
  const ScrollDown = () => {
    scrollref.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (scrollref.current) {
      ScrollDown();
    }
  }, [scrollref]);

  useEffect(() => {
    if (channelId) {
      onSnapshot(
        query(
          collection(db, "post", channelId, "message"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => setPortfo(snapshot.docs)
      );
    }
  }, [channelId]);

  useEffect(() => {
    if (!channelId) {
      navigate("/");
    }
  }, [channelId, navigate]);

  return (
    <Container>
      <Header>
        <span> # {channelName}</span>
        <InfoOutlinedIcon style={{ cursor: "pointer" }} />
      </Header>
      <Messenger>
        {portfo.map((post) => (
          <Messager
            key={post?.id}
            caption={post?.data().input}
            username={post?.data().username}
            email={post?.data().email}
            photo={post?.data().photo}
            id={post?.id}
          />
        ))}
        <SpaceBelow ref={scrollref} />
      </Messenger>

      <Const>
        <InputContainer onSubmit={Submit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
          />
          <button disabled={loading} onClick={Submit}>
            {loading ? "sending" : "send"}
          </button>
        </InputContainer>
      </Const>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    padding: 4px;
  }
  span {
    font-weight: 700;
  }
`;

const InputContainer = styled.form`
  position: fixed;
  bottom: 30px;
  z-index: 999999;
  max-width: 42rem;
  width: 91%;
  padding: 1rem 1.5rem;
  margin: 0 auto;
  width: 600px;
  border-radius: 999px;
  border: 1px solid black;
  display: flex;

  input {
    width: 100%;
    border: none;
    padding: 0 5px;
    :focus {
      outline: none;
    }
  }
  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
    font-weight: 600;
    color: rgb(96 165 250);
    margin-left: 10px;
  }
`;

const Const = styled.div`
  display: flex;
  justify-content: center;
`;

const SpaceBelow = styled.div`
  margin-top: 40px;
`;

const Messenger = styled.div`
  max-height: 550px;
  overflow-y: auto;
`;
