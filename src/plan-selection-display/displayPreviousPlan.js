import React, { useState } from "react";
import { PromptContainer, Container } from "../styles/prompt-container";
import { monthDayFormat, importISO } from "../utils/time";
import { fetchUpdatePlans } from "../utils/api";
import useGenerateList from "../hooks/useGenerateList";

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
  const { planData, oldPlans } = props;

  const { activity, futureCheckIn, userId, id } = planData;
  const { name, duration, frequency } = activity;

  const [updateName, setUpdateName] = useState(name);
  const [updateDuration, setUpdateDuration] = useState(duration);
  const [updateFrequency, setUpdateFrequency] = useState(frequency);
  const [isUpdating, setIsUpdating] = useState(false);

  const { exercisesList } = useGenerateList("exercises");
  const { timeList } = useGenerateList("time");
  const { frequencyList } = useGenerateList("frequency");

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
    fetchPut(JSON.stringify(data), userId, id);
    setIsUpdating(!isUpdating);
  };

  const sortPlans = plans => {
    const sort = plans.sort((a, b) => a.week.start.localeCompare(b.week.start));
    return sort;
  };

  return (
    <Container>
      <div
        style={{
          background: "#38506B",
          padding: "20px",
          marginBottom: "20px",
          color: "#558ea5"
        }}
      >
        <h2 style={{ marginTop: 0 }}>Previous Plans</h2>
        {sortPlans(oldPlans).map(op => {
          const startDate = monthDayFormat(importISO(op.week.start));
          const acName = op.activity.name;
          const acDuration = op.activity.duration;
          const acFrequency = op.activity.frequency;
          return (
            <p key={startDate} style={{ marginBottom: 0 }}>
              {startDate} | {acName} {acDuration} {acFrequency}
            </p>
          );
        })}
      </div>
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
            <select
              defaultValue={updateName}
              onChange={e => handleOnChange(e, setUpdateName)}
            >
              {exercisesList.map(v => (
                <option value={v} key={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block" }} htmlFor="updateDuration">
              Activity Duration
            </label>
            <select
              defaultValue={updateDuration}
              onChange={e => handleOnChange(e, setUpdateDuration)}
            >
              {timeList.map(v => (
                <option value={v} key={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block" }} htmlFor="updateFrequency">
              Activity Frequency
            </label>
            <select
              defaultValue={updateFrequency}
              onChange={e => handleOnChange(e, setUpdateFrequency)}
            >
              {frequencyList.map(v => (
                <option value={v} key={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              borderTop: "2px solid rgba(0, 0, 0, .2)",
              paddingTop: "20px"
            }}
          >
            <button style={{ marginRight: "20px" }} onClick={updateButton}>
              Save Changes
            </button>
            <button onClick={() => setIsUpdating(!isUpdating)}>Cancel</button>
          </div>
        </form>
      )}
    </Container>
  );
};

export default DisplayPreviousPlan;
