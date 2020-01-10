import React, { useState, useEffect } from "react";
import PromptSelection from "./prompt-selection";
import { fetchGet } from "./utils/api";

const Main = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      const userRes = await fetchGet("users");
      setUser(userRes);
    };
    getUser();
  }, []);

  if (user) {
    const { firstName, lastName, avatar, userId } = user[0];
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around"
          }}
        >
          <div>
            <h1
              style={{
                textAlign: "left",
                fontWeight: "bold",
                marginBottom: ".5rem"
              }}
            >
              Workout Coach
            </h1>
            <h2
              style={{
                textAlign: "left",
                fontWeight: "normal",
                marginTop: ".25rem",
                fontSize: "1rem"
              }}
            >
              Keeping yourself accountable
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <img
              style={{
                height: "25px",
                width: "25px",
                borderRadius: "50%",
                marginRight: "10px"
              }}
              src={avatar}
              alt={`${firstName} ${lastName}'s avatar`}
            />
            Hi, {firstName} {lastName}
          </div>
        </div>
        <PromptSelection userId={userId} />
      </>
    );
  }
  return "Loading...";
};

export default Main;
