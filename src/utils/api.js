export const fetchGet = async apiPath => {
  let res = await fetch(
    `https://5e10148d83440f0014d82b80.mockapi.io/api/v1/${apiPath}`
  );
  return await res.json();
};

export const fetchGetPlans = async id => {
  let res = await fetch(
    `https://5e10148d83440f0014d82b80.mockapi.io/api/v1/users/${id}/plan`
  );
  return await res.json();
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
