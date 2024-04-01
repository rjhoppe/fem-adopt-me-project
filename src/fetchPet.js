const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1];

  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  // React Query demands an error message, but fetch doesn't always give one
  // Use something like this every time using React Query
  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  // Returns promise
  return apiRes.json();
};

export default fetchPet;
