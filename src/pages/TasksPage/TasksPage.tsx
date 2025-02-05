import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../redux/StoreContext";
import { addTask, updateTaskStatus } from "../../redux/action";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {Container,Input, TextArea,Button, TaskCard, TaskList, Column, AddTaskButton} from "./TasksPage.style"

const TasksPage = () => {
  const { projectId } = useParams();
  const { state, dispatch } = useContext(StoreContext);

  // Фильтрация задач по projectId
  const tasks = state.tasks.filter((task: any) => String(task.projectId) === projectId);

  // Состояния для добавления новой задачи
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  // Функция для добавления задачи
  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      dispatch(addTask(projectId, newTaskTitle, newTaskDescription));
      setNewTaskTitle("");
      setNewTaskDescription("");
    }
  };

  
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    dispatch(updateTaskStatus(Number(result.draggableId), result.destination.droppableId));
  };

  return (
    <Container>
      <h1>Задачи проекта</h1>

   
      {tasks.length === 0 ? (
        <AddTaskButton onClick={() => setNewTaskTitle("")}>
          Добавить задачу
        </AddTaskButton>
      ) : (
        <>
       3
          <Input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Название задачи"
          />
          <TextArea
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Описание задачи"
          />
          <Button onClick={handleAddTask}>Добавить задачу</Button>
        </>
      )}

      {/* Drag and Drop для перетаскивания задач по статусам */}
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskList>
          {["queue", "development", "done"].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <Column
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{status.toUpperCase()}</h2>
                  {tasks
                    .filter((task: any) => task.status === status)
                    .map((task: any, index: number) => (
                      <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                        {(provided) => (
                          <TaskCard
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                          </TaskCard>
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
    </Container>
  );
};

export default TasksPage;