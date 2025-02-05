
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { HomePage } from './pages/HomePage/HomePage';
import ProjectSelectionPage from './pages/ProjectSelectionPage';
import TasksPage from './pages/TasksPage/TasksPage';

const App = () => (

    <Routes> 
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectSelectionPage />} /> 
      <Route path="/tasks" element={<TasksPage />} /> 
    </Routes>
 
);

export default App;
