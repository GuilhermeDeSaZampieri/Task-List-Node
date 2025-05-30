const BASE_URL = "http://localhost:3333";

export const fetchTasks = async () => {
  const res = await fetch(`${BASE_URL}/tasks`);
  const data = await res.json();
  return data.tasks;
};


export const addTask = async (task) => {
  try {
    const resp = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.error);
    }

    return await resp.json();
  } catch (error) {
    throw error; 
  }
};


export const updateTask = async ({ id, title, status }) => {
  try {
    const resp = await fetch(`http://localhost:3333/tasks/${id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, status }),
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.error);
    }

    return await resp.json();

  } catch (error) {
    throw error; 
  }
};


export const deleteTask = async (id) => {
  await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "delete",
  });
};



