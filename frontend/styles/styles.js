import { StyleSheet } from 'react-native';
const bg_color = "#7fa142";
const lighter_color = "#c1dcb6"; // lighter shade
const darker_color = "#516b30";  // darker shade
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', 
  },
  colorPart: {
    flex: 1,
    backgroundColor: '#213246',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  whitePart: {
    flex: 1,
    backgroundColor: '#fff', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 50,
  },
  logo: {
    width: 300,
    height: 300,
    position:"relative",
    bottom:350
  },
  formContainer: {
    width: '80%', 
    alignItems: 'center',
    position:"absolute",
    top:20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius:10,
  },
  button: {
    backgroundColor: '#7fa142', // Button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width:300,
    borderRadius:10
  },
  buttonText: {
    color: '#fff', // Button text color
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:"center"
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  confirm: {
    width: 200,
    height: 180,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 220,
    left: '45%',
    marginLeft: -80, 
  },
  
  confirmContent: {
    height: '70%',
    alignItems: 'center',
    padding: 20,
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0E2431',
  },
  confirmText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#0E2431',
  },
  confirmDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  confirmButtons: {
    flexDirection: 'row',
    height: '30%',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#7fa142',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonReject: {
    flex: 1,
    backgroundColor: '#FF5733', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  HomePageMain: {
    backgroundColor: '#7fa142',
    width: '100%',
    height: '100%',
  },
  HomePageText:{
    color: '#fff',
    fontSize:35,
    marginTop:80,
    marginLeft:10,
    fontWeight:'bold'
  },
 
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: bg_color, 
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: lighter_color, 
    marginHorizontal: 5,
    borderRadius:30
  },
  activeTabButton: {
    backgroundColor: darker_color, 
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', 
  },

  OrderDetailBox: {
    backgroundColor: lighter_color,
    margin: 20,
    height: 110,
    width: 360,
    borderRadius: 20,
    position: 'relative',
    left:20

 
  
  },
Orders:{
 display:"flex",
 flexDirection:"row",
 

},
RiderLogo:{
  width:80,
  height:80
},
CustomersName:{
 fontSize:20,
 marginTop:20,


},
NameAndAddress: {
  marginLeft: 10,
},


CustomersAddress:{
  fontSize:10,
 


 
 
 },
 ButtonsContainer: {
  flexDirection: 'row',
  marginTop: 10, 
  justifyContent: 'space-around',
  position:"relative",
  bottom:5,
  left:-22
},
 OrdersDetailsButton: {
  fontSize: 14,
  textAlign: 'center',
  backgroundColor: '#4CAF50',
  borderRadius: 20,
  marginRight:10

 
},
AcceptButton: {
  fontSize: 14,
  textAlign: 'center',
  backgroundColor: '#4CAF50',
  borderRadius: 20,
  width:100,


},
DeclineButton: {
  fontSize: 14,
  textAlign: 'center',
  backgroundColor: '#FF5722',
  borderRadius: 20,
  width:100

 
},
ButtonsContainer2:{
  flexDirection: 'row',
  marginTop: 10, 
  justifyContent: 'space-around',
  position:"relative",
  bottom:5,
  left:-20
  

},
OrdersDetailsButton2: {
  fontSize: 14,
  textAlign: 'center',
  backgroundColor: '#FF5722',
  borderRadius: 20,
  width:20
  
},

ShowRouteButton: {
  fontSize: 14,
  textAlign: 'center',
  backgroundColor: '#800080',
  borderRadius: 20,
  width:100,
  color:"#F5F5DC"

 
},
OverallRatingText:{
textAlign:"center",
fontSize:20,
color:"white",
marginTop:30



},
Reviews:{
  textAlign:"center",
  color:"white",
  fontSize:90

},
TotalReviews:{
  textAlign:"center",
  color:"white",
  fontSize:20

},
Progress: {
  flexDirection: 'row', 
  alignItems: 'center', 
  margin: 20,
  width: '80%',
},
progressBarContainer: {
  flex: 1, 
  height: 20,
  backgroundColor: "#e0e0de",
  borderRadius: 10,
  marginLeft: 10, 
},
filler: {
  height: '100%',
  borderRadius: 10,
},
label: {
  color: '#000',
  fontWeight: 'bold',
  fontSize: 16,
  width: 100, 
}
});



//#800080