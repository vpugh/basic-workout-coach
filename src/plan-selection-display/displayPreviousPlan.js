import React, { useState } from "react";
import { PromptContainer, Container } from "../styles/prompt-container";
import { monthDayFormat, importISO } from "../utils/time";
import { fetchUpdatePlans } from "../utils/api";

const borderBottom = "1px solid";
const fontWeight = "bold";

const style = {
  borderBottom,
  fontWeight
};

const fetchPut = (body, userId, planId) => {
  fetchUpdatePlans(body, planId, userId);
};

const DisplayPreviousPlan = props => {
  const { planData } = props;
  const { activity, futureCheckIn, userId, id } = planData;
  const { name, duration, frequency } = activity;
  const [updateName, setUpdateName] = useState(name);
  const [updateDuration, setUpdateDuration] = useState(duration);
  const [updateFrequency, setUpdateFrequency] = useState(frequency);
  const [isUpdating, setIsUpdating] = useState(false);

  const data = {
    userId,
    id,
    futureCheckIn,
    activity: {
      name: updateName,
      duration: updateDuration,
      frequency: updateFrequency
    },
    week: {
      ...planData.week
    }
  };

  const handleOnChange = (e, setFunction) => setFunction(e.target.value);

  const updateButton = async () => {
    await fetchPut(JSON.stringify(data), userId, id);
    console.log("Send new data");
    setIsUpdating(!isUpdating);
    console.log("Rerender new data");
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

      {!isUpdating && (
        <button
          style={{ margin: "20px 0" }}
          onClick={() => setIsUpdating(!isUpdating)}
        >
          {isUpdating ? "Save Changes" : "Update"}
        </button>
      )}
      {isUpdating && (
        <form
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <h3>Update Week Plan</h3>
            <label style={{ display: "block" }} htmlFor="updatName">
              Activity Name
            </label>
            <input
              id="updateName"
              defaultValue={updateName}
              onChange={e => handleOnChange(e, setUpdateName)}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block" }} htmlFor="updateDuration">
              Activity Duration
            </label>
            <input
              id="updateDuration"
              defaultValue={updateDuration}
              onChange={e => handleOnChange(e, setUpdateDuration)}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block" }} htmlFor="updateFrequency">
              Activity Frequency
            </label>
            <input
              id="updateFrequency"
              defaultValue={updateFrequency}
              onChange={e => handleOnChange(e, setUpdateFrequency)}
            />
          </div>
          <button onClick={updateButton}>Save Changes</button>
          <button onClick={() => setIsUpdating(!isUpdating)}>Cancel</button>
        </form>
      )}
    </Container>
  );
};

export default DisplayPreviousPlan;
