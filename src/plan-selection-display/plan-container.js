import React, { useState, useEffect } from "react";
import DisplayPreviousPlan from "./displayPreviousPlan";
import AddActivity from "./addActivity";
import { formatISO, startOfWeek } from "../utils/time";
import { fetchPreviousPlans } from "../utils/api";

const PlanContainer = props => {
  const [planData, setPlanData] = useState();
  const [hasCurrentPlan, setHasCurrentPlan] = useState(false);
  const [fetchingPlan, setFetchingPlan] = useState(true);

  const { userId } = props;

  const checkCurrentPlan = plan => {
    const plans = plan.reduce((acc, p) => {
      acc.push(p.week.start);
      return acc;
    }, []);
    return plans.includes(formatISO(startOfWeek));
  };

  const currentPlanData = plan => {
    return plan.reduce((acc, p) => {
      if (p.week.start.includes(formatISO(startOfWeek))) {
        acc.push(p);
      }
      return acc;
    }, []);
  };

  useEffect(() => {
    const getPreviousPlans = async () => {
      const plans = await fetchPreviousPlans(userId);
      if (plans && plans.length > 0 && checkCurrentPlan(plans)) {
        setHasCurrentPlan(true);
        setPlanData(currentPlanData(plans));
      } else {
        setHasCurrentPlan(false);
      }
      setFetchingPlan(false);
    };
    getPreviousPlans();
  }, [userId]);

  if (hasCurrentPlan && planData) {
    return <DisplayPreviousPlan planData={planData[0]} userId={userId} />;
  }

  if (!fetchingPlan || !hasCurrentPlan) {
    return <AddActivity userId={userId} />;
  }

  return <p>Loading Menu...</p>;
};

export default PlanContainer;
