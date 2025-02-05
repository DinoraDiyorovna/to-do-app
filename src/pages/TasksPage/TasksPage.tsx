import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { StoreContext } from "../../redux/StoreContext";
import { addTask, loadTasks, updateTaskStatus, editTask, addSubtask } from "../../redux/action";
import {
  Container,
  ModalBackground,
  ModalContent,
  ModalTextArea,
  ModalInput,
  TaskList,
  Column,
  AddTaskButton,
} from "./TasksPage.style";

interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: "queue" | "development" | "done";
  subtasks?: { id: string; title: string }[];
}

const TasksPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { state, dispatch } = useContext(StoreContext);

  useEffect(() => {
    const savedTasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    dispatch(loadTasks(savedTasks));
  }, [dispatch]);

  const tasks: Task[] = state.tasks.filter((task: Task) => task.projectId === projectId);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [subtaskTitle, setSubtaskTitle] = useState<string>("");

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      dispatch(addTask(projectId, newTaskTitle, newTaskDescription));
      setNewTaskTitle("");
      setNewTaskDescription("");
      setOpenModal(false);
    }
  };

  const handleEditTask = (taskId: string) => {
    dispatch(editTask(taskId, editTitle, editDescription));
    setEditingTask(null);
  };

  const handleAddSubtask = (taskId: string) => {
    if (subtaskTitle.trim()) {
      dispatch(addSubtask(taskId, subtaskTitle));
      setSubtaskTitle("");
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId as "queue" | "development" | "done";
    dispatch(updateTaskStatus(taskId, newStatus));
  };

  return (
    <Container>
      <h1>Задачи проекта</h1>
      <AddTaskButton onClick={() => setOpenModal(true)}>Добавить задачу</AddTaskButton>

      <DragDropContext onDragEnd={handleDragEnd}>
        <TaskList>
          {["queue", "development", "done"].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided:any) => (
                <Column ref={provided.innerRef} {...provided.droppableProps}>
                  <h2>{status.toUpperCase()}</h2>
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided:any) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {editingTask === task.id ? (
                              <div>
                                <input
                                  type="text"
                                  value={editTitle}
                                  onChange={(e) => setEditTitle(e.target.value)}
                                />
                                <textarea
                                  value={editDescription}
                                  onChange={(e) => setEditDescription(e.target.value)}
                                />
                                <button onClick={() => handleEditTask(task.id)}>Сохранить</button>
                                <button onClick={() => setEditingTask(null)}>Отмена</button>
                              </div>
                            ) : (
                              <div>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <button
                                  onClick={() => {
                                    setEditingTask(task.id);
                                    setEditTitle(task.title);
                                    setEditDescription(task.description);
                                  }}
                                >
                                  Редактировать
                                </button>
                                <input
                                  type="text"
                                  placeholder="Добавить подзадачу"
                                  value={subtaskTitle}
                                  onChange={(e) => setSubtaskTitle(e.target.value)}
                                />
                                <button onClick={() => handleAddSubtask(task.id)}>
                                  Добавить подзадачу
                                </button>
                                {task.subtasks?.map((sub) => (
                                  <p key={sub.id}>- {sub.title}</p>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </Column>
              )}
            </Droppable>
          ))}
        </TaskList>
      </DragDropContext>

      {openModal && (
        <ModalBackground onClick={() => setOpenModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Добавить новую задачу</h2>
            <ModalInput
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Название задачи"
            />
            <ModalTextArea
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Описание задачи"
              rows={4}
            />
            <button onClick={handleAddTask}>Добавить</button>
            <button onClick={() => setOpenModal(false)}>Отмена</button>
          </ModalContent>
        </ModalBackground>
      )}
    </Container>
  );
};

export default TasksPage;
