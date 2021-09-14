import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import startEditIcon from '../assets/icons/edit/startEdit.png'
import cancelEditIcon from '../assets/icons/edit/cancelEdit.png'

export interface Task {
  id: number;
  title: string;
  done: boolean;
  edit: boolean;
}

export interface TasksItemFunctionsProps {
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
}

interface TasksItemProps extends TasksItemFunctionsProps {
  index: number;
  item: Task;
  tasks: Task[];
}

export function TasksItem({ index, item, toggleTaskDone, removeTask, editTask, tasks }: TasksItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [textTitle, setTextTitle] = useState(item.title);

  const textInputRef = useRef<TextInput>(null);

  const handleStartEditing = () => setIsEditing(true);
  const handleCancelEditing = () => { setIsEditing(false); setTextTitle(item.title); };

  const handleRemoveTask = () => {
    Alert.alert(
      "Tem certeza que quer remover essa tarefa ?",
      "A ação de remover uma tarefa não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Remover",
          onPress: () => removeTask(item.id),
        }
      ]
    )
    
  }

  const thisTaskExist = (title: string) => tasks.find(task => task.title === title);

  const handleSubmitEditing = () => { 
    if (thisTaskExist(textTitle)) {
      Alert.alert("Task já cadastrada","Você não pode editar uma task com o mesmo nome");
      handleCancelEditing();
      return;
    }
    setIsEditing(false); 
    editTask(item.id, textTitle); 
  };

  useEffect(() => {
    if (!textInputRef.current) return;

    isEditing
      ? textInputRef.current.focus()
      : textInputRef.current.blur();
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            value={textTitle}
            onChangeText={setTextTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
            style={item.done ? styles.taskTextDone : styles.taskText}
            underlineColorAndroid="transparent" 
            selectionColor="gray"
          />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={styles.iconContainer}>
        {
          isEditing ? (
            <TouchableOpacity
              testID={`edit-${index}`}
              onPress={handleCancelEditing}
            >
              <Image source={cancelEditIcon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              testID={`edit-${index}`}
              onPress={handleStartEditing}
            >
              <Image source={startEditIcon} />
            </TouchableOpacity>
          )
        }
        </View>

        <View style={styles.divisor}/>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={[styles.trash,{ opacity: isEditing ? 0.2 : 1 }]}
          onPress={handleRemoveTask}
          disabled={isEditing}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
  iconContainer: { 
    width: 20, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  divisor: {
    marginHorizontal: 12,
    width: 1, 
    height: 24, 
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
  },
  trash: {
    paddingRight: 24,
  },
})
