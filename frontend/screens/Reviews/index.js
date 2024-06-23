import React, { useEffect, useState } from 'react'
import { styles } from '../../styles/styles'
import { View, Text, Image, TextInput, TouchableOpacity, Alert,Button,ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { RiderReview } from '../../redux/slice/API';
import * as SecureStore from 'expo-secure-store';

function Review() {

  const [Review,SetReviews]=useState(0);
  const [TotalRating,SetTotalRating]=useState(0)

const dispatch=useDispatch();
useEffect(() => {
  const fetchData = async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      if (token) {
        const result = await dispatch(RiderReview({ token }));
        console.log(result.payload);
        if(result.payload)
          {
            await SetReviews(result.payload.rating)
            await SetTotalRating(result.payload.totalRating)
          }

      } else {
        console.error('No token found');
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  fetchData();
}, []);
  return (
    <View style={styles.HomePageMain}>

<Text style={styles.HomePageText}>Customer Feedback</Text>


<Text style={styles.OverallRatingText}>Overall Rating</Text>
<Text style={styles.Reviews}>{Review}</Text>
<Text style={styles.TotalReviews}>Based on {TotalRating} Review</Text>

</View>
  )
}

export default Review
