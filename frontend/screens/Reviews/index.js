import React, { useEffect, useState } from 'react'
import { styles } from '../../styles/styles'
import { View, Text, Image, TextInput, TouchableOpacity, Alert,Button,ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { RiderReviewData,RiderReviewCustomers,GetAllCustomersRiderReview } from '../../redux/slice/API';
import * as SecureStore from 'expo-secure-store';
import StarRating from 'react-native-star-rating';
import ProgressBar from '../../ components/ProgressBar';
import CustomersReview from '../../ components/CustomersReview';


function Review() {

  const [Review,SetReviews]=useState(0);
  const [TotalRating,SetTotalRating]=useState(0);
  const [AllRating,SetAllRating]=useState([])
  const [CustomersRating,SetCustomersRating]=useState([])

const dispatch=useDispatch();
useEffect(() => {
  const fetchData = async () => {
    try {
      const storedData = await SecureStore.getItemAsync('authData');
      const { authToken } = JSON.parse(storedData);
      if (authToken) {
        const result = await dispatch(RiderReviewData({ authToken }));
        const result1 = await dispatch(RiderReviewCustomers({ authToken }));
        const result2 = await dispatch(GetAllCustomersRiderReview({ authToken }));

       
        if(result.payload)
          {
            await SetReviews(result.payload.rating)
            await SetTotalRating(result.payload.totalRating)
          }
          if(result1.payload)
          {
            // console.log(result1.payload)
            SetAllRating(result1.payload)
          }
          if(result2.payload)
            {
              // console.log(result2.payload)
              SetCustomersRating(result2.payload)
            
            }

      } else {
        console.log('No authToken found');
      }
    } catch (error) {
      console.log('Failed to fetch data:', error);
    }
  };

  fetchData();
}, []);

useEffect(()=>{
  console.log(CustomersRating)
},[CustomersRating])
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

{AllRating.map((item, idx) => (
        <ProgressBar label={item.label} key={idx} bgcolor={item.bgcolor} completed={item.completed} />
      ))}
      <ScrollView >

      {CustomersRating.map((item, index) => (
        <CustomersReview 
          key={index} 
          name={item.name} 
          rating={item.rating} 
          comment={item.review} 
        />
      ))}
      </ScrollView>

</View>
  )
}

export default Review
