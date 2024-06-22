import React from 'react'
import { styles } from '../../styles/styles'
import { View, Text, Image, TextInput, TouchableOpacity, Alert,Button,ScrollView } from 'react-native';

function Review() {
  return (
    <View style={styles.HomePageMain}>

<Text style={styles.HomePageText}>Customer Feedback</Text>


<Text style={styles.OverallRatingText}>Overall Rating</Text>

</View>
  )
}

export default Review
