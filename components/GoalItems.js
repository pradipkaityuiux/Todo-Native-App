import { View, Text, Pressable } from 'react-native'
import { styles } from '../App'
import React from 'react'

export default function GoalItems({ goalItem, onDeleteHandle }) {
    return (
        <Pressable onPress={()=>onDeleteHandle(goalItem.item.key)} android_ripple={{color: '#f00'}} style={styles.goalsContainer}>
            <View>
                <Text style={{ color: '#fff', fontSize: 20, paddingBlock: 10 }}>{goalItem.item.text}</Text>
            </View>
        </Pressable>
    )
}