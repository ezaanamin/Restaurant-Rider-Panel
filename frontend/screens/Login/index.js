import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../../styles/styles';
import myImage from "../../assets/Amin Resturant-logos_white.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import { LoginRider } from '../../redux/slice/API';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';


function Login({ navigation }) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Must be 8 characters or more")
        .matches(/[a-z]+/, "One lowercase character")
        .matches(/[A-Z]+/, "One uppercase character")
        .matches(/[@$!%*#?&]+/, "One special character")
        .matches(/\d+/, "One number")
    }),

    onSubmit: async (values) => {
      try {
        // alert("hiiii")
        const action = await dispatch(LoginRider(values));
        console.log(action,'action')
        if (action.payload.error) {
          Alert.alert("Login Failed", action.payload.error);
        } else if (action.payload.token) {
          try {
            let d = new Date();
            let hours = d.getHours();
            let minutes = d.getMinutes();
            
            minutes = minutes < 10 ? '0' + minutes : minutes;
            
            let time = hours + ":" + minutes; 
const data = {
  authToken: action.payload.token,
  time: time
};
await SecureStore.setItemAsync('authData', JSON.stringify(data));
            // console.log("Token stored successfully.");
            navigation.navigate('MainTabs');
          } catch (error) {
            console.log("Error:", error); // Log error here
            Alert.alert("Error", "Failed to store token.");
          }
        }
      } catch (error) {
        console.log("Error:", error); 
        // console.log(`BASE_URLriders/login`);
        Alert.alert("Login Failed", "Invalid email or password. Please try again.");
      }
    }
  
}); // <--- Closing parenthesis for useFormik
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log('This will run after 1 second!');
  //     useEffectCallback();
  //   }, 1000);

  //   // No cleanup function is returned, so the effect runs indefinitely
  // }, []); 
  //   const useEffectCallback = () => {
  //   // Code to execute after the 1-second delay
  //   console.log('useEffectCallback called!');
  // };

  useEffect(() => {
    const getTokenAndTime = async () => {
      try {
        const storedData = await SecureStore.getItemAsync('authData');
        if (storedData) {
          const { authToken, time } = JSON.parse(storedData);
          console.log(authToken, 'authToken');
          console.log(time, 'time');
          let d = new Date();
          let hours = d.getHours();
          let minutes = d.getMinutes();
          
          minutes = minutes < 10 ? '0' + minutes : minutes;
          
          let current_time = hours + ":" + minutes;
          let difference=current_time-time
          console.log(difference)
          // if (authToken) {
          //   navigation.navigate('MainTabs');
          // }
        }
      } catch (error) {
        console.error('Error while getting token and time:', error);
      }
    };
  
    getTokenAndTime();
  }, [navigation]);
  return (
<View style={styles.container}>
      <LinearGradient
        colors={['#213246', '#7fa142']}
        style={styles.colorPart}
      />
      <View style={styles.whitePart}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={myImage} />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Unleash Your Ride</Text>
          <TextInput
            style={styles.input}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            value={formik.values.email}
            placeholder="Email"
          />
          {formik.touched.email && formik.errors.email ? (
            <Text style={styles.error}>{formik.errors.email}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            value={formik.values.password}
            placeholder="Password"
            secureTextEntry={true}
          />
          {formik.touched.password && formik.errors.password ? (
            <Text style={styles.error}>{formik.errors.password}</Text>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Login;
