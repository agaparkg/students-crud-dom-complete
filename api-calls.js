const url = "https://63000b629350a1e548e9abfc.mockapi.io/api/v1/students";

export const getStudents = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {}
};
