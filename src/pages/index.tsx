import { NextPage, GetServerSideProps } from "next";
import { db } from "@/firebasae";
import { Message } from "@/types";
import { useUser } from "@/contexts/userContext";
import firebase from "@/firebasae";
import { Button } from "@material-ui/core";

type Props = {
  message: Message;
};

const IndexPage: NextPage<Props> = ({ message }: Props) => {
  const { user, loadingUser } = useUser();

  const login = () => {
    firebase.auth().signInAnonymously();
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  if (loadingUser) {
    return (
      <>
        <span>loading now...</span>
      </>
    );
  }
  return (
    <>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
      <h1>{message.title}</h1>
      <span>{message.body}</span>
      {user ? (
        <button onClick={logout}>logout</button>
      ) : (
        <button onClick={login}>login</button>
      )}
    </>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const messageRefDoc = db.collection("messages").doc("message1");
  const message = (await messageRefDoc.get()).data();
  return { props: { message } };
};
