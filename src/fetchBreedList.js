const fetchBreedList = async ({ queryKey }) => {
  const animal = queryKey[1];

  if (!animal) return [];

  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );

  // React Query demands an error message, but fetch doesn't always give one
  // Use something like this every time using React Query
  if (!apiRes.ok) {
    throw new Error(`breeds/${animal} fetch not ok`);
  }

  // Returns promise
  return apiRes.json();
};

export default fetchBreedList;
