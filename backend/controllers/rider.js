import Rider from "../model/rider.js"
import Orders from "../model/orders.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createClient } from 'redis';
import { io } from "../index.js";
import { RiderReview } from "../model/RiderReviews.js";
import Customer from "../model/customers.js";

export async function authorizeToken(authorizationHeader,tokenheaders) {
  if (!authorizationHeader) {
    throw new Error('Not authorized');
  }
  let token;
  if(tokenheaders)
  {
   token = authorizationHeader.split(' ')[1].replace(/"/g, '');
  }
  if(!tokenheaders)
  {

    token=authorizationHeader;
  }
  const token_key = process.env.TOKEN_KEY;

  // console.log(token, 'ezaan');

  return new Promise((resolve, reject) => {
    jwt.verify(token, token_key, (err, decoded) => {
      if (err) {
        console.error('Token verification failed:', err);
        reject(new Error('Token verification failed'));
      } else {
        console.log(decoded.user_id);
        resolve(decoded.user_id);
      }
    });
  });
}



export const GetRiders = async (req, res) => {
  Rider.find({}).then(function (doc) {
    if (!doc) {
      res.send("Unsucessful")
    }
    else { res.json(doc) }
  })
}

export const LoginRider = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;

    const doc = await Rider.findOne({ email: email });

    if (doc) {
      const match = await bcrypt.compare(password, doc.password);

      if (match) {
        const token = jwt.sign(
          { user_id: doc._id, name: doc.name },
          process.env.TOKEN_KEY,
          { expiresIn: "2h" }
        );
        console.log("Sucessul")
        return res.json({ token: token });
      } else {
        return res.json({ error: "Invalid password" });
      }
    } else {
      return res.json({ error: "Rider not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const RiderInformation = async (req, res) => {
  try {
    const authorizationHeader = req.headers['authorization'];
    console.log(authorizationHeader,'ezaan')
    console.log(authorizationHeader);
    if (!authorizationHeader) {
      return res.status(401).send('Not authorized');
    }
    let user_id = '';
    try {
      let tokenheaders=true;
      await authorizeToken(authorizationHeader,tokenheaders)
      .then(decodedId => {
        user_id = decodedId;
        // console.log(userId, 'ezaan');
      })
      .catch(error => {
        console.log("Token verification error:", error);
      });  
     
    } catch (error) {
      console.log("Token verification error:", error);
      return res.status(500).json({ error: "Token verification failed" });
    }
    console.log(user_id,'ezaan amin')
    try {
      const rider = await Rider.findById(user_id);
      if (!rider) {
        console.log("error rider not found");
        return res.status(404).json({ error: "Rider not found" });
      }
      const client = createClient();
      await client.connect();
      const cachedOrders = await client.get(rider.name);
      if (cachedOrders) {
        const orders = JSON.parse(cachedOrders); 
        console.log(orders);
        return res.status(200).json({ rider, orders });
      }
      const orders = await Orders.find({ rider: rider._id }).populate("customer_id");
      await client.set(rider.name, JSON.stringify(orders));
 console.log(rider,orders);
      return res.status(200).json({ rider, orders });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// async function monitorNewOrder(userId) {
//   const client = createClient();
//   await client.connect();
//   const changeStream = Orders.watch();


//     changeStream.on('change', async (data) => {
//       try {
//         if (data.fullDocument && data.fullDocument.rider.equals(userId)) {
//           const doc = await Orders.findById(data.documentKey._id);
//           if (doc) {
//            return doc;
//           }
//         }
//       } catch (error) {
//         reject(error);
//       }
//     });

// }



export const NewOrdersDisplay = async (token,data) => {

  let user_id;
  const token_key = process.env.TOKEN_KEY;
let customer_information={};
let order_detail=[];
let tokenheaders=false;

  // jwt.verify(token,token_key,(error,decode)=>{

  //   if(decode)
  //   {

  //     user_id=decode.user_id
  //   }

  // })

  await authorizeToken(token,tokenheaders)
    .then(decodedId => {
      user_id = decodedId;
      // console.log(userId, 'ezaan');
    })
    .catch(error => {
      console.error("Token verification error:", error);
    });  

  try {

    if (user_id) {
      try {
        const fullDocument = await Orders.findOne({ _id: data.documentKey._id });
        if (fullDocument && fullDocument.rider.equals(user_id)) { 
          Orders.findById(data.documentKey._id)  .populate('customer_id')   .then((doc,err) => {
            if (doc) {
              customer_information['order_number']=doc.order_id;
              customer_information['customer_name']=doc.customer_id.name;
              customer_information['address']=doc.customer_id.address;
              customer_information['status']=doc.status
              order_detail.push(customer_information)
              console.log(order_detail)
              io.emit('new_order',order_detail);
            }
            if(err)
            {
              console.log(err)
            }
          });
        }
      } catch (error) {
        console.error('Error retrieving full document:', error);
      }

    } else {
      console.log("not login")
    }
  } catch (error) {
    console.error('Error in NewOrdersDisplay:', error);
  }
}

export const PushNotification = async (data) => {


 const result= await Orders.findById(data);

 if(result)
  {
    // console.log(result.rider);
   let r= await Rider.findById(result.rider)
   console.log(r);
  }
  else
  {
    console.log("error");
  }


}
// changeStream.on('change', async (data) => {
//   try {
//     const fullDocument = await Orders.findOne({ _id: data.documentKey._id });
//     if (fullDocument && fullDocument.rider.equals(decoded.user_id)) {
//       const doc = await Orders.findById(data.documentKey._id);
//       if (doc) {
//         const cachedOrders = await client.get(decoded.name);
//         if (cachedOrders) {
//           let orders = JSON.parse(cachedOrders);
//           res.json({orders})
//           // const index = orders.findIndex(order => order.order_id === doc.order_id);
//           // if (index !== -1) {
//           //   orders.splice(index, 1); 
//           // }
          
//           // orders.push(doc);

//           // await client.set(decoded.name, JSON.stringify(orders)); 

//           // res.status(200).json({ orders });
//         }
//       }
//     }
//   } catch (error) {
//     console.error('Error retrieving full document:', error);
//   }
// });

export const UpdateOrders = async (req, res) => {
  let userId = "";
  const authorizationHeader = req.headers['authorization'];
  let tokenheaders=true;
  
  await authorizeToken(authorizationHeader,tokenheaders)
    .then(decodedId => {
      userId = decodedId;
      console.log(userId, 'ezaan');
    })
    .catch(error => {
      console.error("Token verification error:", error);
    });  
  const rider = await Rider.findById(userId);
  if (!rider) {
    console.log("hiii")
    return res.status(404).json({ error: "Rider not found" }); 
  }
    else {
     
      const { status, order_number } = req.body;
      console.log(status)
      console.log(order_number)
    let order_id =order_number;
    
    // console.log(order_id);
    // console.log(status);
    
    const client = createClient();
    await client.connect();
    const cachedOrders = await client.get(rider.name);
    if (cachedOrders) {
      const orders = JSON.parse(cachedOrders); 
      const foundOrder = orders.find(order => order.order_id === order_id); 
      let new_order_status;
      let rejected=false;
      if (foundOrder) {
        if (status === "Decline") {
          foundOrder.rider = "";
          foundOrder.status = "Pending";
          new_order_status="Pending"
          rejected=true

          // await Orders.findOneAndUpdate(
          //   { order_id: order_id },
          //   { $set: { status :"Pending" , rider: "" } }
          // ).then((doc,err)=>{
          //   if(doc)
          //   {
          //     console.log(doc)
          //   }
          //   if(err){
          //     console.log(err)
          //   }
          // });


        } if(status=="Accept")
          {
            new_order_status="On Route";
            foundOrder.status = "On Route";
            rejected=false;

          }
          
      
        }

        await Orders.findOneAndUpdate(
          { order_id: order_id },
          { $set: { status :new_order_status , rider: rejected ? "" : rider._id } }
        ).then((doc,err)=>{
          if(doc)
          {
            // console.log(doc)
          }
          if(err){
            // console.log(err)
          }
        });
     
        // console.log(foundOrder,'found');
        // console.log(new_order_status,rejected,'new_order rejected')        
        // console.log(orders,'ezaan');
        await client.set(rider.name, JSON.stringify(orders));
        res.json({ orders: orders });
      } else {
        const updatedDoc = await Orders.findOneAndUpdate(
          { order_id: order_id },
          { $set: { status:status, rider: status === "Pending" ? "" : rider._id } },
          { new: true }
        );
        if (updatedDoc) {

        orders.push(updatedDoc);
        await client.set(rider.name, JSON.stringify(orders));
        console.log(orders,'orders');

        return res.json({ orders: orders });
        }
        else
        {
          return res.status(404).json({ error: "Order not found" });
        }

      }
    }
  }


export const RiderReviewData = async (req, res) => {
  const authorizationHeader = req.headers['authorization'];

  let user_id = '';
  try {
    let tokenheaders=true;
    await authorizeToken(authorizationHeader,tokenheaders)
    .then(decodedId => {
      user_id = decodedId;
      // console.log(userId, 'ezaan');
    })
    .catch(error => {
      console.log("Token verification error:", error);
    });  
   
  } catch (error) {
    console.log("Token verification error:", error);
    return res.status(500).json({ error: "Token verification failed" });
  }
    
Rider.findById(user_id).then((doc)=>{

  res.json({rating:doc.rating,totalRating:doc.totalReview})


})

}

export const GetAllRiderReview =async (req,res)=>{
  const authorizationHeader = req.headers['authorization'];
  let user_id = '';
  try{
    let tokenheaders=true;
    await authorizeToken(authorizationHeader,tokenheaders)
    .then(decodedId => {
      user_id = decodedId;
      // console.log(userId, 'ezaan');
    })
    .catch(error => {
      console.log("Token verification error:", error);
    }); 


  }
  catch (error) {
    console.log("Token verletification error:", error);
    return res.status(500).json({ error: "Token verification failed" });
  }


  RiderReview.find({rider_id:user_id}).then((doc)=>{

    const reviews = doc[0];
    let length=reviews.reviews.length
    let five_rating=0.0
    let four_rating=0.0
    let three_rating=0.0
    let two_rating=0.0
    for (let i=0;i<length;i++)
    {
      console.log(reviews.reviews[i].rating);
      if(reviews.reviews[i].rating===5)
      {
        five_rating++;

      }
      if(reviews.reviews[i].rating===4)
      {
        four_rating++;

      }
      if(reviews.reviews[i].rating===3)
      {
        three_rating++;
      }
      if(reviews.reviews[i].rating===2)
{
  two_rating++;
}



    }
  



five_rating=Math.floor(five_rating/length*100)
four_rating=Math.floor(four_rating/length*100)
three_rating=Math.floor(three_rating/length*100)
two_rating=Math.floor(two_rating/length*100)




const AllRating = [
  { bgcolor: "#4B0082", label:"Excellent", completed: five_rating },
  { bgcolor: "#6A0D91",label:"Good",  completed: four_rating },
  { bgcolor: "#8A2BE2",label:"Average", completed: three_rating },
  { bgcolor: "#A020F0",label:"Poor", completed: two_rating },


];

res.json(AllRating)

  })


}

export const GetAllCustomersRiderReview = async (req, res) => {
  const client = createClient();
  await client.connect();
  const authorizationHeader = req.headers['authorization'];
  let user_id = '';

  try {
    const decodedId = await authorizeToken(authorizationHeader, true);
    user_id = decodedId;
  } catch (error) {
    console.error("Token verification error:", error);
    await client.disconnect(); 
    return res.status(500).json({ error: "Token verification failed" });
  }

  const username = `${user_id} reviews`;
  try {
    const usernameCheck = await client.exists(username);

    if (usernameCheck) {
      const value = await client.get(username);
      const userData = JSON.parse(value);
      await client.disconnect();
      return res.json(userData);
    } else {
      let customer_information = [];

      const docs = await RiderReview.find({ rider_id: user_id });
      const data = docs[0];

      if (!data || !data.reviews) {
        await client.disconnect(); 
        return res.status(404).json({ error: "No reviews found for the rider" });
      }

      const promises = data.reviews.map(async review => {
        const doc1 = await Customer.findById(review.customer_id);
        return {
          name: doc1.name,
          review: review.comment,
          rating: review.rating
        };
      });

      try {
        customer_information = await Promise.all(promises);

   
        await client.set(username, JSON.stringify(customer_information));
        const expirationInSeconds = 3600;
        await client.expire(username, expirationInSeconds);

        await client.disconnect();
        res.json(customer_information);
      } catch (err) {
        console.error('Error fetching customer information:', err);
        await client.disconnect(); 
        res.status(500).json({ error: "Error fetching customer information" });
      }
    }
  } catch (error) {
    console.error('Error interacting with Redis:', error);
    await client.disconnect(); 
    res.status(500).json({ error: "Error interacting with Redis" });
  }
};