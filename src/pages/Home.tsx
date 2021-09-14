import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task } from '../components/TaskItem';
import { TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const thisTaskExist = (title: string) => tasks.find(task => task.title === title);

  function handleAddTask(newTaskTitle: string) {
    if (thisTaskExist(newTaskTitle)) {
      Alert.alert("Task já cadastrada","Você não pode cadastrar uma task com o mesmo nome");
      return;
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
      edit: false,
    };
    setTasks(oldTasks => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.done = task.done ? false : true;
      }
      return task
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  }

  function handleEditTaskTitle(id: number, title: string) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.title = title;
      }
      return task;
    });

    setTasks(updatedTasks);
  }


  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTaskTitle}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})