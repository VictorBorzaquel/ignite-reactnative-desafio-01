import React from 'react';
import { FlatList } from 'react-native';
import { ItemWrapper } from './ItemWrapper';
import { TasksItem, TasksItemFunctionsProps, Task } from './TaskItem';

interface TasksListProps extends TasksItemFunctionsProps {
  tasks: Task[];
}

export function TasksList({ tasks, ...rest }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 32 }}
      renderItem={({ item, index }) =>
        <ItemWrapper index={index}>
          <TasksItem
            tasks={tasks}
            item={item}
            index={index}
            {...rest }
          />
        </ItemWrapper>
      }
    />
  )
}
