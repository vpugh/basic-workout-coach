import React from "react";
import { PromptContainer, Container } from "../styles/prompt-container";
import { monthDayFormat, importISO } from "../utils/time";

const borderBottom = "1px solid";
const fontWeight = "bold";

const style = {
  borderBottom,
  fontWeight
};

const fetchPut = (body, userId) => {
  console.log(body);
  fetch(
    `https://5e10148d83440f0014d82b80.mockapi.io/api/v1/previous-plan/${userId}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "PUT",
      body
    }
  );
};

const DisplayPreviousPlan = props => {
  const { planData, userId } = props;
  const { activity, futureCheckIn } = planData;
  const { name, duration, frequency } = activity;

  const data = {
    ...planData,
    test: "test"
  };

  return (
    <Container>
      <PromptContainer>
        You will attempt to <span style={{ ...style }}>{name}</span> for{" "}
        <span style={{ ...style }}>{duration}</span> at least{" "}
        <span style={{ ...style }}>{frequency}</span> and will check back in on{" "}
        <span style={{ ...style }}>
          {monthDayFormat(importISO(futureCheckIn))}
        </span>
      </PromptContainer>
      <button onClick={() => fetchPut(data, userId)}>Update</button>
    </Container>
  );
};

export default DisplayPreviousPlan;
