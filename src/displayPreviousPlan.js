import React from "react";
import { PromptContainer, Container } from "./styles/prompt-container";

const borderBottom = "1px solid";
const fontWeight = "bold";

const style = {
  borderBottom,
  fontWeight
};

const DisplayPreviousPlan = props => {
  const { activity, activityTime, activityFrequency, futureCheckIn } = props;
  return (
    <Container>
      <PromptContainer>
        You will attempt to <span style={{ ...style }}>{activity}</span> for{" "}
        <span style={{ ...style }}>{activityTime}</span> at least{" "}
        <span style={{ ...style }}>{activityFrequency}</span> and will check
        back in on <span style={{ ...style }}>{futureCheckIn}</span>
      </PromptContainer>
    </Container>
  );
};

export default DisplayPreviousPlan;
