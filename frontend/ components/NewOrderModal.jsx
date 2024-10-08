import React, { useState } from 'react';
import { View, Modal,Text, StyleSheet, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { UserContext } from '../contextState/contextState';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { UpdateOrders } from '../redux/slice/API';
import * as SecureStore from 'expo-secure-store';

const NewOrderModal = ({ Customer_name, address, order_number }) => {
  const dispatch = useDispatch();
  const userContext = useContext(UserContext);
  const { SetNewOrderModal, SetRiderOrderData,NewOrderModal_ } =userContext;
  const handleConfirm = async ({status,order_number}) => {
    const storedData = await SecureStore.getItemAsync('authData');
    const { authToken } = JSON.parse(storedData);
    // console.log(result,'ezaan')
  
    // orders_data.push({ status: status, order_number: order_number })

    // console.log(orders_data)

console.log(order_number,'order numbers');
console.log(status,'status');

    try {
      const action = await dispatch(UpdateOrders({ token: authToken, status: status, order_number: order_number }));
      if (action.payload) {
        console.log(action.payload,'action payload');
        // await SetRiderOrderData([]);
        await SetRiderOrderData(action.payload);
        SetNewOrderModal(false);
      }
    } catch (error) {
      console.log('Error updating orders:', error);
      // Handle error as needed
    }

  };
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={NewOrderModal_}
      >
        <View style={styles.confirm}>
          <View style={styles.confirmContent}>
            <Text style={styles.confirmTitle}>New Order # {order_number} </Text>
            <View>
              <Text style={styles.confirmText}>{Customer_name}</Text>
              <Text style={styles.confirmDescription}>{address}</Text>
            </View>
          </View>
          <View style={styles.confirmButtons}>
          <TouchableOpacity
  style={styles.confirmButton}
  onPress={() => handleConfirm({status: 'Accept', order_number})}
>
  <Text style={styles.confirmButtonText}>Accept</Text>
</TouchableOpacity>
<TouchableOpacity
  style={styles.confirmButtonReject}
  onPress={() => handleConfirm({status: 'Reject', order_number})}
>
  <Text style={styles.confirmButtonText}>Reject</Text>
</TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default NewOrderModal;




// const CustomAlert = ({ visible, message, onClose }) => {
//   return (
//     <Modal
//       animationType="fade"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}>
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         }}>
//         <View
//           style={{
//             backgroundColor: 'white',
//             padding: 20,
//             borderRadius: 10,
//             alignItems: 'center',
//           }}>
//           <Text style={{ fontSize: 20 }}>{message}</Text>
//           <TouchableOpacity onPress={onClose} style={{ marginTop: 20 }}>
//             <Text style={{ color: 'blue', fontSize: 16 }}>OK</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default CustomAlert;
