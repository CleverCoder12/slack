import React, { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";
import Header from "./components/Header";
import Slidebar from "./components/Slidebar";
import { useDispatch, useSelector } from "react-redux";
import { selectName, setLogin, setLogOut } from "./features/User/userSlice";
import Login from "./components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import Home from "./components/Home";

function App() {
  const name = useSelector(selectName);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
      } else {
        dispatch(
          setLogOut({
            name: null,
            email: null,
            photo: null,
          })
        );
      }
    });
  }, [dispatch]);
  return (
    <Container>
      {name ? (
        <Router>
          <Header />
          <Coulmn>
            <Slidebar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Home />
                  </>
                }
              />
              <Route path="/chat/:id" element={<Chat />} />
            </Routes>
          </Coulmn>
        </Router>
      ) : (
        <Login />
      )}
    </Container>
  );
}

export default App;

const Container = styled.div``;

const Coulmn = styled.div`
  display: flex;
`;
