import React, { useState } from "react";
import {
  PromptContainer,
  PromptText,
  Container,
  PromptDate
} from "../styles/prompt-container";
import {
  formatISO,
  startOfWeek,
  endOfWeek,
  currentWeek,
  getDayName,
  futureFirstWeek
} from "../utils/time";
import { fetchPostPlans } from "../utils/api";
import useGenerateList from "../hooks/useGenerateList";

const handleOnChange = (e, setFunction) => setFunction(e.target.value);

const defaultText = (variable, defaultText) => {
  if (variable) {
    return <p>{variable}</p>;
  }
  return <p>{defaultText}</p>;
};

const sendPlan = (id, body) => {
  fetchPostPlans(id, body);
};

const capitializeFirstLetter = (word) => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

const AddActivity = (props) => {
  const { userId } = props;
  const [futureCheckIn, setFutureCheckIn] = useState(null);

  const [activity, setActivity] = useState(null);
  const [activityTime, setActivityTime] = useState(null);
  const [activityFrequency, setActivityFrequency] = useState(null);

  const [submittedPlan, setSubmittedPlan] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // const { exercisesList } = useGenerateList("exercises");
  const exercisesList = [
    "workout",
    "weight train",
    "swim",
    "walk",
    "run",
    "jog",
    "zumba",
    "yoga",
    "pilates",
    "cycle",
    "row",
    "toil at home",
    "flexibility stretch",
    "jump rope"
  ];
  // const { timeList } = useGenerateList("time");
  const timeList = [
    "15 minutes",
    "30 minutes",
    "45 minutes",
    "1 hour",
    "1 hour and 15 minutes",
    "1 hour and 30 minutes",
    "1 hour and 45 minutes"
  ];
  // const { frequencyList } = useGenerateList("frequency");
  const frequencyList = [
    "once a week",
    "twice a week",
    "three times a week",
    "four times a week",
    "five times a week"
  ];

  const submitPlan = () => {
    const submittedData = {
      userId,
      futureCheckIn: generateCheckIn(),
      activity: {
        name: activity,
        duration: activityTime,
        frequency: activityFrequency
      },
      week: {
        start: formatISO(startOfWeek),
        end: formatISO(endOfWeek)
      }
    };
    sendPlan(userId, JSON.stringify(submittedData));
    setSubmittedPlan(true);
    setSubmitted(true);
  };

  const generateSelect = (textVariable, text, setFunction, mapVariable) => {
    return (
      <>
        {defaultText(textVariable, text)}
        <select onChange={(e) => handleOnChange(e, setFunction)}>
          <option value="">Select One</option>
          {mapVariable.map((v) => (
            <option value={v} key={v}>
              {capitializeFirstLetter(v)}
            </option>
          ))}
        </select>
      </>
    );
  };

  const generateCheckIn = () => {
    setFutureCheckIn(getDayName());
    return futureFirstWeek;
  };

  if (exercisesList && timeList && frequencyList) {
    return (
      <Container>
        <PromptText>
          <PromptDate>{currentWeek()}</PromptDate>
          <p>What is your plan for this week?</p>
        </PromptText>
        <PromptContainer>
          {generateSelect(
            activity,
            "Select an activity",
            setActivity,
            exercisesList
          )}
          {activity &&
            generateSelect(
              activityTime,
              "How long will you do this for?",
              setActivityTime,
              timeList
            )}
          {activityTime &&
            generateSelect(
              activityFrequency,
              "How many times will you do this in a week",
              setActivityFrequency,
              frequencyList
            )}
          {activityFrequency && <p>Will check back in a week.</p>}
        </PromptContainer>
        {activity && activityTime && activityFrequency && (
          <div
            style={{
              padding: "20px",
              margin: "0 auto"
            }}
          >
            <button disabled={submitted} onClick={submitPlan}>
              Complete Planning
            </button>
          </div>
        )}
        {submittedPlan && (
          <p>
            You will do {activity} for {activityTime} at least{" "}
            {activityFrequency} and will check in next {futureCheckIn}
          </p>
        )}
      </Container>
    );
  }

  return <p>Loading...</p>;
};

export default AddActivity;
