const url = "https://63000b629350a1e548e9abfc.mockapi.io/api/v1/students/";

export const getStudents = async () => {
  try {
    // const res = await fetch(url);
    // const data = await res.json();
    // return data;
    return await (await fetch(url)).json();
  } catch (error) {
    console.log({
      message: "Something went wrong!",
      error,
    });
  }
};

export const getSingleStudent = async (id) => {
  try {
    return await (await fetch(url + id)).json();
  } catch (error) {
    console.log({
      message: "Something went wrong!",
      error,
    });
  }
};

// req.body
// req.params

export const apiDeleteStudents = async (id) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  try {
    return await (await fetch(url + id, options)).json();
  } catch (error) {
    console.log({
      message: "Something went wrong!",
      error,
    });
  }
};

export const apiPostStudent = async (formData) => {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(formData),
  };
  try {
    return await (await fetch(url, options)).json();
  } catch (error) {
    console.log({
      message: "Something went wrong!",
      error,
    });
  }
};

export const apiPutStudent = async (id, formData) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(formData),
  };
  try {
    return await (await fetch(url + id, options)).json();
  } catch (error) {
    console.log({
      message: "Something went wrong!",
      error,
    });
  }
};

export const getStudents2 = () => fetch(url).then((res) => res.json());
