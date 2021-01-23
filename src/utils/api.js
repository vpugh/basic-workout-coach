export const fetchGet = async (apiPath) => {
  let res = await fetch(
    `https://5e10148d83440f0014d82b80.mockapi.io/api/v1/${apiPath}`
  );
  return await res.json();
};

export const fetchGetPlans = async (id) => {
  let res = await fetch(
    `https://5e10148d83440f0014d82b80.mockapi.io/api/v1/users/${id}/plan`
  );
  // return await res.json();
  return {
    userId: "1",
    id: "2",
    futureCheckIn: "2020-01-19T04:40:05.720Z",
    activity: {
      name: "run",
      duration: "1 hour",
      frequency: "three times a week"
    },
    week: {
      start: "2020-01-06T05:00:00.000Z",
      end: "2020-01-13T04:59:59.999Z"
    }
  };
};

export const fetchPostPlans = (userId, body) => {
  fetch(
    `https://5e10148d83440f0014d82b80.mockapi.io/api/v1/users/${userId}/plan`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body
    }
  );
};

export const fetchUpdatePlans = async (body, planId, userId) => {
  fetch(
    `https://5e10148d83440f0014d82b80.mockapi.io/api/v1/users/${userId}/plan/${planId}`,
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
