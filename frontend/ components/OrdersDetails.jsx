import React, { useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, Button } from 'react-native';
import { styles } from '../styles/styles';
import { UserContext } from '../contextState/contextState';
import { useContext } from 'react';
import Logo from ".././assets/rider.png"
import { UpdateOrders } from '../redux/slice/API';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { Linking, Platform } from 'react-native';


const OrdersDetails = ({CustomersName,Order_Number,CustomersAddress,status}) => {
    const userContext = useContext(UserContext);
    const {RiderOrderData,SetRiderOrderData} = userContext;
    const dispach=useDispatch();

    const openMaps = () => {
        const latitude = 37.78825;
        const longitude = -122.4324;
        const label = 'Custom Label';
        const url = Platform.select({
          ios: `maps://app?daddr=${latitude},${longitude}&label=${label}`,
          android: `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`
        });
      
        Linking.openURL(url);
      };
    

    // useEffect(() => {
    //     if (RiderOrderData && RiderOrderData.orders && RiderOrderData.orders.length > 0) {
    //         console.log(RiderOrderData.orders,'data')
    //         console.log(RiderOrderData.orders[0].status)
    //         console.log(RiderOrderData.orders[0].customer_id, 'amin');
    //         console.log(RiderOrderData.orders[0].customer_id.name, 'ezaan');
            
           
    //     } else {
    //         console.log('RiderOrderData or RiderOrderData.orders is not available or is empty');
    //     }
    // }, [RiderOrderData]);
    
    
    const UpdateOrder=async (status,order_number)=>{
        const { authToken } = JSON.parse(storedData);
        // alert(status);
        // alert(order_number)
        let action= await dispach(UpdateOrders({token:authToken,status:status,order_number:order_number}));
        if(action.payload)
            {
                console.log(action.payload,'orders starks');
               await SetRiderOrderData([]);
                await SetRiderOrderData(action.payload)


            }

    }

    return (
        <View style={styles.OrderDetailBox}>
        <View style={styles.Orders}>
            <Image style={styles.RiderLogo} source={Logo} />
            {RiderOrderData && RiderOrderData.orders && RiderOrderData.orders.length > 0 ? (
                <View style={styles.NameAndAddress}>
                  
                    <Text style={styles.CustomersName}>{CustomersName}</Text>
                    <Text style={styles.CustomersAddress}><Text style={{ fontWeight: 'bold' }}>Order Number </Text>#{Order_Number}</Text>
                    <Text style={styles.CustomersAddress}>{CustomersAddress}</Text>

                </View>
            ) : null}
                </View>
               {status === "Pending" || status === "assigned" ? (
                    <View style={styles.ButtonsContainer}>
                        <TouchableOpacity onPress={() => UpdateOrder('Accept', Order_Number)} style={styles.OrdersDetailsButton}>
                            <Text style={styles.AcceptButton}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => UpdateOrder('Decline', Order_Number)} style={styles.OrdersDetailsButton2}>
                            <Text style={styles.DeclineButton}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
                               {status === "On Route"  ? (
                                            <View style={styles.ButtonsContainer2}>
                                        
                                            <TouchableOpacity onPress={openMaps}  style={styles.OrdersDetailsButton2}>
                                                <Text style={styles.ShowRouteButton}>Show Route</Text>
                                                
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.OrdersDetailsButton2}>
                                                <Text style={styles.AcceptButton}>Delivered</Text>
                                                
                                            </TouchableOpacity>
                                          
                                        </View>
                                    ) : null}


    
     
    </View>
    

    );
}

export default OrdersDetails;
