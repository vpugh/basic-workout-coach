import React, { useState, useEffect } from "react";
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
import { fetchGet } from "../utils/api";

const handleOnChange = (e, setFunction) => setFunction(e.target.value);

const defaultText = (variable, defaultText) => {
  if (variable) {
    return <p>{variable}</p>;
  }
  return <p>{defaultText}</p>;
};

const fetchPost = body => {
  fetch("https://5e10148d83440f0014d82b80.mockapi.io/api/v1/previous-plan", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body
  });
};

const capitializeFirstLetter = word => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

const AddActivity = () => {
  const [futureCheckIn, setFutureCheckIn] = useState(null);

  const [listExercises, setListExercises] = useState();
  const [listTime, setListTime] = useState();
  const [listFrequency, setListFrequency] = useState();

  const [activity, setActivity] = useState(null);
  const [activityTime, setActivityTime] = useState(null);
  const [activityFrequency, setActivityFrequency] = useState(null);

  const [submittedPlan, setSubmittedPlan] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getActivites = async () => {
    const activityRes = await fetchGet("exercises");
    setListExercises(activityRes);
  };

  const getTime = async () => {
    const timeRes = await fetchGet("time");
    setListTime(timeRes);
  };

  const getFrequency = async () => {
    const frequencyRes = await fetchGet("frequency");
    setListFrequency(frequencyRes);
  };

  useEffect(() => {
    getActivites();
    getTime();
    getFrequency();
  }, []);

  const submitPlan = props => {
    const { userId } = props;
    const submittedData = {
      userId,
      plan: [
        {
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
        }
      ]
    };
    fetchPost(JSON.stringify(submittedData));
    console.log(submittedData);
    setSubmittedPlan(true);
    setSubmitted(true);
  };

  const generateSelect = (textVariable, text, setFunction, mapVariable) => {
    return (
      <>
        {defaultText(textVariable, text)}
        <select onChange={e => handleOnChange(e, setFunction)}>
          <option value="">Select One</option>
          {mapVariable.map(v => (
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
    return formatISO(futureFirstWeek());
  };

  if (listExercises && listTime && listFrequency) {
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
            listExercises
          )}
          {activity &&
            generateSelect(
              activityTime,
              "How long will you do this for?",
              setActivityTime,
              listTime
            )}
          {activityTime &&
            generateSelect(
              activityFrequency,
              "How many times will you do this in a week",
              setActivityFrequency,
              listFrequency
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
