import React, { useState, useEffect } from "react";
import DisplayPreviousPlan from "./displayPreviousPlan";
import AddActivity from "./addActivity";
import {
  formatISO,
  monthDayFormat,
  startOfWeek,
  importISO,
  currentWeek
} from "./utils/time";
import { fetchPreviousPlans } from "./utils/api";

const PromptSelection = props => {
  const [previousPlanData, setPreviousPlan] = useState();
  const [hasPreviousPlan, setHasPreviousPlan] = useState(false);
  const [fetchingPlan, setFetchingPlan] = useState(true);

  const { userId } = props;

  useEffect(() => {
    const getPreviousPlans = async () => {
      const previousPlans = await fetchPreviousPlans(userId);
      if (previousPlans) {
        setHasPreviousPlan(true);
        setPreviousPlan(previousPlans);
      } else {
        setHasPreviousPlan(false);
      }
      setFetchingPlan(false);
    };
    getPreviousPlans();
  }, [userId]);

  if (
    previousPlanData &&
    previousPlanData.week &&
    previousPlanData.week.start === formatISO(startOfWeek)
  ) {
    const {
      activity,
      activityTime,
      activityFrequency,
      futureCheckIn
    } = previousPlanData;
    return (
      <DisplayPreviousPlan
        activity={activity}
        activityTime={activityTime}
        activityFrequency={activityFrequency}
        futureCheckIn={monthDayFormat(importISO(futureCheckIn))}
        currentWeek={currentWeek}
      />
    );
  }

  if (!fetchingPlan) {
    return <AddActivity />;
  }

  return <p>Loading Menu...</p>;
};

export default PromptSelection;
