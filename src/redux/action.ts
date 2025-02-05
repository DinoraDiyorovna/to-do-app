export const addProject = (name:string) => ({
  type: "ADD_PROJECT",
  payload: name,
});

export const deleteProject = (id:string) => ({
  type: "DELETE_PROJECT",
  payload: id,
});

export const addTask = (projectId:any, title:string, description:string) => ({
  type: "ADD_TASK",
  payload: { projectId, title, description },
});

export const updateTaskStatus = (taskId:any, status:string) => ({
  type: "UPDATE_TASK_STATUS",
  payload: { taskId, status },
});

export const deleteTask = (id:string) => ({
  type: "DELETE_TASK",
  payload: id,
});
export const loadProjects = (projects: any[]) => ({
  type: "LOAD_PROJECTS",
  payload: projects,
});


