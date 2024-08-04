import React, { useEffect, useState } from 'react'
import { styles } from '../../styles/styles'
import { View, Text, Image, TextInput, TouchableOpacity, Alert,Button,ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { RiderReviewData,RiderReviewCustomers } from '../../redux/slice/API';
import * as SecureStore from 'expo-secure-store';
import StarRating from 'react-native-star-rating';

function Review() {

  const [Review,SetReviews]=useState(0);
  const [TotalRating,SetTotalRating]=useState(0)

const dispatch=useDispatch();
useEffect(() => {
  const fetchData = async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      if (token) {
        const result = await dispatch(RiderReviewData({ token }));
        const result1 = await dispatch(RiderReviewCustomers({ token }));

       
        if(result.payload)
          {
            await SetReviews(result.payload.rating)
            await SetTotalRating(result.payload.totalRating)
          }
          if(result1.payload)
          {
            console.log(result1.payload)
          }

      } else {
        console.log('No token found');
      }
    } catch (error) {
      console.log('Failed to fetch data:', error);
    }
  };

  fetchData();
}, []);
  return (
    <View style={styles.HomePageMain}>

<Text style={styles.HomePageText}>Customer Feedback</Text>


<Text style={styles.OverallRatingText}>Overall Rating</Text>
<Text style={styles.Reviews}>{Review}</Text>
<View style={{width:300,marginLeft:"auto",marginRight:"auto",display:"block",marginTop:10,marginBottom:10}}>
<StarRating
        disabled={false}
        maxStars={5}
        rating={Review}
        fullStarColor={'#e6f2e6'}
        
      />

</View>

<Text style={styles.TotalReviews}>Based on {TotalRating} Review</Text>


</View>
  )
}

export default Review
