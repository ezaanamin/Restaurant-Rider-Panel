import React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Alert,Button,ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import StarRating from 'react-native-star-rating';

function CustomersReview({rating,name,comment}) {
  return (
   <>
   <View style={{width:200,marginLeft:"auto",marginRight:"auto",display:"block",marginTop:10,marginBottom:10,display:"flex", flexDirection: 'row'}}>

  <StarRating
        disabled={false}
        maxStars={5}
        rating={rating}
        fullStarColor={'#e6f2e6'}
        starSize={20}
      />
      <Text style={{marginLeft:20}}>{name}</Text>
</View>
<View style={{width:200,marginLeft:"auto",marginRight:"auto",display:"block",marginTop:10,marginBottom:10}}>

<Text style={{marginLeft:20}}>{comment}</Text>
</View>

   </>
  )
}

export default CustomersReview
