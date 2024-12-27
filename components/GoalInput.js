import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { styles } from '../App'

export default function GoalInput({addGoalHandler, handleTextInput, goalText, isVisible, closeGoalHandler}) {
  const inputRef = useRef(null);
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        inputRef.current.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);
  return (
    <Modal visible={isVisible} animationType='slide'>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Enter your Goal" style={styles.inputBox} placeholderTextColor={'#707070'} onChangeText={handleTextInput} value={goalText} ref={inputRef}/>
        <TouchableOpacity style={styles.button} onPress={addGoalHandler}>
          <Text style={styles.buttonText}>Add +</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cencelButton} onPress={closeGoalHandler}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
        {/* <Button title='Add' onPress={addGoalHandler}/> */}
      </View>
    </Modal>
  )
}