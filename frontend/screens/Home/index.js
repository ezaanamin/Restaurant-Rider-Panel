import React, { useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert,Button,ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux'; 
import { RiderInformation, NewOrdersDisplay } from '../../redux/slice/API';
import io from "socket.io-client"
import { useState } from 'react';
import NewOrderModal from '../../ components/NewOrderModal';
import { UserContext } from '../../contextState/contextState';
import { useContext } from 'react';
import { styles } from '../../styles/styles';
import TabButton from '../../ components/TabButton';
import OrdersDetails from '../../ components/OrdersDetails';
function Home({ }) {

 
  const dispatch = useDispatch(); 
  const [socket, setSocket] = useState(null); 
  const userContext = useContext(UserContext);
  const { SetNewOrderModal ,SetNewOrderData,SetRiderOrderData,activeTab, setActiveTab,RiderOrderData,NewOrderModal_} = userContext;
  const [CurrentOrder,SetCurrentOrders]=useState([]);
  useEffect(() => {
    const getTokenAndFetchOrders = async () => {
      try {
        const storedData = await SecureStore.getItemAsync('authData');
        const { authToken } = JSON.parse(storedData);

      // console.log(token,'token')
   
        const newsocket = io.connect('BASE_URL', {
          query: {
            token: authToken
          }
        });
        
        newsocket.on('connect', () => {
          console.log('Connected to server with token:', authToken);
        });
        setSocket(newsocket)
        newsocket.on('connection', data => {
      
        });

       
        const action = await dispatch(RiderInformation({ authToken }));
console.log(action,)
        if(action.payload)
        {
          console.log(action.payload,'EZAAN');
          SetRiderOrderData(action.payload);
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    getTokenAndFetchOrders();
  }, [dispatch]);


//   useEffect(() => {
//     let tokenAvailable = false;

//     const checkToken = async () => {
//         const token = await SecureStore.getItemAsync('authToken');
//         if (token) {
//             tokenAvailable = true;
//         }
//     };

//     const removeListener = navigation.addListener("beforeRemove", (e) => {
//         if (tokenAvailable) {
//             e.preventDefault();
//         }
//     });

//     checkToken(); 

//     return removeListener;
// }, [navigation]);



  useEffect(() => {
    if (socket) {
        socket.on("new_order", async (data) => {
            console.log(data[0].status, 'new_order');
            // alert("new_order!!!!")
          
            await SetNewOrderData(data);
            if(data[0].status=="Pending")
            {
              await SetNewOrderModal(true);


            }


if (data[0].status == "On Route") {
  Alert.alert("Order No# "+data[0].order_number + " has been assigned to you. Delivery expected in 30 minutes. Delivered on time.");
}


        });
    }

    return () => {
        if (socket) {
            (async () => {
                await SetNewOrderData([]);
                socket.off("new_order");
            })();
        }
    };
}, [socket, SetNewOrderModal, SetNewOrderData]);


useEffect(()=>{

  if(RiderOrderData && RiderOrderData.orders && RiderOrderData.orders.length > 0)
{
if(activeTab=="Assigned")
  {
      
        let orders=RiderOrderData.orders.filter(order => order.status === "Pending" || order.status === "assigned")
        console.log(orders)
        SetCurrentOrders(orders)


      }

      if(activeTab=="On Route")
        {
            
              let orders=RiderOrderData.orders.filter(order => order.status === "On Route")
              SetCurrentOrders(orders)
      
      
            }

            if(activeTab=="Delivered")
              {
                  
                    let orders=RiderOrderData.orders.filter(order => order.status === "Delivered")
                    SetCurrentOrders(orders)
            
            
                  }
    

  }

},[activeTab,RiderOrderData])



// useEffect(()=>{


//   if(userContext.RiderOrderData)
//   {
//     console.log(userContext.RiderOrderData,'ezaan amin ')
//   }
// },[userContext.RiderOrderData])

// useEffect(()=>{

//   console.log(userContext.NewOrderData[0].address,'ezaan')


// },[SetNewOrderData])

// const showAlert = (order) =>
// Alert.alert(
//   'Order Number 3',
//   'Name: ezaan',
//   'Address:',

//   [
//     {
//       text: 'Cancel',
//       onPress: () => Alert.alert('Cancel Pressed'),
//       style: 'cancel',
//     },
//     {
//       text: 'hiiii',
//       onPress: () => Alert.alert('Cancel Pressed'),
//       style: 'cancel',
//     },
//   ],
  
//   {
//     cancelable: true,
//     onDismiss: () =>
//       Alert.alert(
//         'This alert was dismissed by tapping outside of the alert dialog.',
//       ),
//   },
// );

// useEffect(()=>{
//   console.log(RiderOrderData,'EZAAN')
// },[RiderOrderData])

// useEffect(()=>{
// alert(NewOrderModal_)

// },[NewOrderModal_])
  return (
    <View>

    {/* <Button title="Show alert" onPress={() => showAlert(3)} /> */}
    {/* {NewOrderModal_ ? (
  <>
 
    <NewOrderModal 
      Customer_name={userContext.NewOrderData[0].customer_name} 
      address={userContext.NewOrderData[0].address} 
      order_number={userContext.NewOrderData[0].order_number} 
    />
  </>
) : null} */}

<View style={styles.HomePageMain}>


<Text style={styles.HomePageText}>Order List</Text>
<>


</>

<TabButton/>
{/* {
  activeTab === "Assigned" ?
  <Text>HI</Text> :
  activeTab === "On Route" ?
  <Text> Bye</Text> :
  activeTab === "Delivered" ?
  <Text>Ezaan</Text> :
  null 
} */}

<ScrollView >
        {/* <OrdersDetails status={"Assigned"} /> */}
        {



CurrentOrder  && CurrentOrder.length > 0 ? (
    CurrentOrder.map((order, index) => (
        // <>
        // <Text>{order.status}</Text>
        
        // </>
        <OrdersDetails
          status={order.status}
          Order_Number={order.order_id}
          CustomersName={order.customer_id.name}
          CustomersAddress={order.customer_id.address}
        />
     
    ))
  ) : null
}

</ScrollView>
</View>

    </View>
  );
}

export default Home;
