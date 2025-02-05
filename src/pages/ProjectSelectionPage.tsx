import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../redux/StoreContext";
import { addProject, deleteProject, loadProjects } from "../redux/action";
import { Link } from "react-router-dom";

const ProjectSelectionPage = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      dispatch(loadProjects(JSON.parse(savedProjects))); 
    }
  }, [dispatch]);

  const handleAddProject = () => {
    if (projectName.trim()) {
      dispatch(addProject(projectName));
      setProjectName("");
    }
  };

  return (
    <div>
      <h1>Выбор проекта</h1>
      <input
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Название проекта"
      />
      <button onClick={handleAddProject}>Добавить</button>

      <ul>
        {state.projects.map((project:any) => (
          <li key={project.id}>
            <Link to={`/tasks/${project.id}`}>{project.name}</Link>
            <button onClick={() => dispatch(deleteProject(project.id))}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectSelectionPage;
