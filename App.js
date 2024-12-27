import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import GoalItems from './components/GoalItems';
import GoalInput from './components/GoalInput';

export default function App() {
  const [goalText, setGoalText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [allGoals, setAllGoals] = useState([]);

  const handleTextInput = (text) => {
    setGoalText(text);
  }

  const addGoalHandler = () => {
    if(goalText.trim().length === 0) {
      return;
    }
    setAllGoals(goals => [...goals, {
      key: Math.random().toString(),
      text: goalText
    }]);
    setGoalText('');
  }

  function deleteGoalHandler(key) {
    setAllGoals(goals => {
      return goals.filter(goal => goal.key !== key);
    });
  }

  function closeGoalHandler() {
    setModalOpen(false);
    setGoalText('');
  }

  return (
    <View style={styles.appContainer}>
      <View style={{paddingHorizontal: 20}}>
        <Text style={styles.heading}>Todo App 🚀</Text>
        <GoalInput addGoalHandler={addGoalHandler} handleTextInput={handleTextInput} goalText={goalText} isVisible={modalOpen} closeGoalHandler={closeGoalHandler}/>
        <Pressable onPress={()=>setModalOpen(true)} android_ripple={{color: '#70b9ff'}} style={styles.button}>
          <Text style={{color: '#fff', fontSize: 20}}>Add New Goal</Text>
        </Pressable>
      </View>
      {allGoals.length &&
        <View style={{marginTop:40, backgroundColor: '#343b42', flex: 1, padding: 20}}>
          <Text style={styles.heading}>All Goals</Text>
          <FlatList data={allGoals} renderItem={goalItem => {
            return <GoalItems goalItem={goalItem} onDeleteHandle={deleteGoalHandler}/>
          }} 
          alwaysBounceVertical={false}
          keyExtractor={item => item.key}
          />
        </View>}
      {!allGoals.length && <View style={styles.noTextFoundContainer}>
          <Text style={{color: '#fff', fontSize: 20}}>No Goals Found</Text>
        </View>}
      <StatusBar style="light" backgroundColor='#000'/>
    </View>
  );
}

export const styles = StyleSheet.create({
  appContainer:{
    backgroundColor: '#111214',
    // height: '100%',
    flex: 1,
    paddingTop: 60,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#343b42',
    padding: 20,
    borderRadius: 10,
  },
  heading: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20
  },
  inputBox: {
    height: 60,
    fontSize: 20,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingBlock: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  button: {
    height: 60,
    backgroundColor: '#1e90ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  cencelButton: {
    height: 60,
    backgroundColor: '#ff2e3c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  goalsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 20,
    marginBottom: 8,
    borderRadius: 10,
    flex: 1
  },
  noTextFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
