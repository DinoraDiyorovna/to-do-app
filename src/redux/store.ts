import { legacy_createStore as createStore, combineReducers } from "redux";


const loadFromLocalStorage = <T,>(key: string): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : ([] as T);
  } catch (error) {
    console.error("Ошибка загрузки:", error);
    return [] as T;
  }
};


const saveToLocalStorage = (key: string, data: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Ошибка сохранения:", error);
  }
};


const initialProjects = loadFromLocalStorage<{ id: string; name: string }[]>("projects");
const initialTasks = loadFromLocalStorage<{ id: string; projectId: string; title: string; description: string; status: string }[]>("tasks");

type Action =
  | { type: "LOAD_PROJECTS"; payload: { id: string; name: string }[] } 
  | { type: "ADD_PROJECT"; payload: string }
  | { type: "DELETE_PROJECT"; payload: string }
  | { type: "ADD_TASK"; payload: { projectId: string; title: string; description: string } }
  | { type: "UPDATE_TASK_STATUS"; payload: { taskId: string; status: string } }
  | { type: "DELETE_TASK"; payload: string };


const projectsReducer = (state = initialProjects, action: Action) => { 
  switch (action.type) {
    case "LOAD_PROJECTS":
      return action.payload; 

    case "ADD_PROJECT":
      const newProject = { id: Date.now().toString(), name: action.payload };
      const updatedProjects = [...state, newProject];
      saveToLocalStorage("projects", updatedProjects); 
      return updatedProjects;

    case "DELETE_PROJECT":
      const filteredProjects = state.filter((p) => p.id !== action.payload);
      saveToLocalStorage("projects", filteredProjects);
      return filteredProjects;

    default:
      return state;
  }
};


const tasksReducer = (state = initialTasks, action: Action) => {
  switch (action.type) {
    case "ADD_TASK":
      const newTask = {
        id: Date.now().toString(),
        projectId: action.payload.projectId,
        title: action.payload.title,
        description: action.payload.description,
        status: "queue",
      };
      const updatedTasks = [...state, newTask];
      saveToLocalStorage("tasks", updatedTasks);
      return updatedTasks;

    case "UPDATE_TASK_STATUS":
      const changedTasks = state.map((task) =>
        task.id === action.payload.taskId ? { ...task, status: action.payload.status } : task
      );
      saveToLocalStorage("tasks", changedTasks);
      return changedTasks;

    case "DELETE_TASK":
      const filteredTasks = state.filter((task) => task.id !== action.payload);
      saveToLocalStorage("tasks", filteredTasks);
      return filteredTasks;

    default:
      return state;
  }
};


export const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
