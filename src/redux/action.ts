export const addProject = (name:string) => ({
  type: "ADD_PROJECT",
  payload: name,
});

export const deleteProject = (id:string) => ({
  type: "DELETE_PROJECT",
  payload: id,
});

export const deleteTask = (id:string) => ({
  type: "DELETE_TASK",
  payload: id,
});
export const loadProjects = (projects: any[]) => ({
  type: "LOAD_PROJECTS",
  payload: projects,
});
export const loadTasks = (tasks: any[]) => ({
  type: "LOAD_TASKS",
  payload: tasks,
});

export const addTask = (projectId:any, title:any, description:any) => ({
  type: "ADD_TASK",
  payload: { projectId, title, description },
});

export const editTask = (taskId:any, title:any, description:any) => ({
  type: "EDIT_TASK",
  payload: { taskId, title, description },
});

export const addSubtask = (taskId:any, title:any) => ({
  type: "ADD_SUBTASK",
  payload: { taskId, title },
});

export const updateTaskStatus = (taskId:any, status:any) => ({
  type: "UPDATE_TASK_STATUS",
  payload: { taskId, status },
});


