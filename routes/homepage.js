import React, { useContext } from "react";
import UserContext from "./userContext";

function Home() {
  const currentUser = useContext(UserContext);

  return (
    <div>
      <h1>Jobly</h1>
      <p>Welcome to Jobly, {currentUser ? currentUser.username : "guest"}!</p>
    </div>
  );
}

export default Home;