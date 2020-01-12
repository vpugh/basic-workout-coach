export const fetchGet = async apiPath => {
  let res = await fetch(
    `https://5e10148d83440f0014d82b80.mockapi.io/api/v1/${apiPath}`
  );
  let data = await res.json();
  return data;
};

export const fetchPreviousPlans = async id => {
  let res = await fetch(
    `https://5e10148d83440f0014d82b80.mockapi.io/api/v1/users/${id}/plan`
  );
  let data = await res.json();
  return data;
};
