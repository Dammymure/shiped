import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js";
import Order from "../models/Order.js";


export const createAdminAccount = async (req, res) => {
    try {
     const {
      email,
      password,
     } = req.body;
   
     // Check if a user already exists using the email
     const existingAdmin = await Admin.findOne({ email: email });
   
     // If user exists, give an error message
     if (existingAdmin) {
      return res.status(403).json({ msg: 'Admin already exists', existingAdmin });
     }
   
     // Hash the password
     const salt = await bcrypt.genSalt();
     const passwordHash = await bcrypt.hash(password, salt);
   
     // Create a new user
     const newAdmin = await Admin.create({
      email,
      password: passwordHash,
      salt:salt,
      firstname: "",
      lastname: "",
      phone:"",
      Admin: true
     });
     await newAdmin.save();
   
     res.status(201).json(newAdmin);
    } catch (err) {
     res.status(500).json({ error: err.message });
    }
   };


       //    LOGIN
       export const loginAdmin = async (req, res) => {
        try {
          const { email, password } = req.body
          // Checking if the user exists
          const admin = await Admin.findOne({ email: email })
          if (!admin) return res.status(400).json({ msg: "Admin does not exist" })
     
          // then check user password for match
          const isMatch = bcrypt.compare(password, admin.password)
          if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" })
             
          // JWT SIGNING
          const token = jwt.sign({ admin: admin, type: "admin" }, process.env.JWT_SECRET)
          delete admin.password
         //  req.activeuser = user
         // req.user = user //loggin in active user
     
         console.log(`Login Good: ${admin}`)
          res.status(200).json({ token, admin })
     
        
         } catch (err) {
          res.status(500).json({ error: err.message })
         }
       }


    //    This should be with the rider controller
    export const updateOrder = async (req, res) => {
      const admin = req.admin;
      if (!admin) {
        return res.status(401).json({ message: 'Admin not authenticated' });
      }
        const {  lat, lng, status } = req.body;


      
        try {
          const orderId = req.params.id;

          // Find the order by orderId field (not _id)
          const order = await Order.findOne({ orderId: orderId });
      
          if (!order) {
            return res.status(404).json({ message: "Order not found" });
          }


          // Update the lat and lng fields
          // if (lat) order.lat = lat;
          // if (lng) order.lng = lng;
          if (status) order.status = status;
      
          // order.lat = lat;
          // order.lng = lng;
      
          // Save the updated order document
          const updatedOrder = await order.save();
      
          // Send the updated order in response
          res.status(200).json(updatedOrder);
        } catch (error) {
          console.error("Error updating order:", error.message);
          res.status(500).json({ message: 'Server error', error: error.message });
        }
      };
    //    This should be with the rider controller
    // export const updateOrderStatus = async (req, res) => {
    //     const { orderId, lat, lng } = req.body;
      
    //     try {
    //       // Find the order by orderId field (not _id)
    //       const order = await Order.findOne({ orderId: orderId });
      
    //       if (!order) {
    //         return res.status(404).json({ message: "Order not found" });
    //       }
      
    //       // Update the lat and lng fields
    //       order.lat = lat;
    //       order.lng = lng;
      
    //       // Save the updated order document
    //       const updatedOrder = await order.save();
      
    //       // Send the updated order in response
    //       res.status(200).json(updatedOrder);
    //     } catch (error) {
    //       console.error("Error updating order location:", error.message);
    //       res.status(500).json({ message: 'Server error', error: error.message });
    //     }
    //   };
      
    //   Assign rider
    export const assignRider = async (req, res) => {
        const { orderId } = req.body;

    }

    export const Auth = async ( req, res) => {
      const admin = req.admin;
    
      if (admin) {
        console.log("check Admin");
        return res.status(200).json(admin.admin);
      }
      
    
      return res.status(400).json({ message: "Error with authenticating admin profile" });
    };

    // get all orders
    export const AllOrders = async (req, res) => {
      const admin = req.admin; // Assuming req.admin is set by middleware
    
      try {
        if (!admin) {
          return res.status(401).json({ message: 'Admin not authenticated' });
        }
    
        const orders = await Order.find().populate('userId'); // Add await to resolve the promise
    
        if (!orders || orders.length === 0) {
          return res.status(404).json({ message: 'No orders found' });
        }
    
        return res.status(200).json(orders) // Return the orders array
      } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
      }
    };
    

    // GET ONE DELIVERY
export const getOneOrder = async (req, res) => {
  const admin = req.admin;
  if (!admin) {
    return res.status(401).json({ message: 'Admin not authenticated' });
  }
  
  try {
    const orderId = req.params.id;
    if (orderId) {
      const order = await Order.findOne({orderId:orderId}).populate('userId')
      if(!order){
        return res.status(400).json({ message: 'Order does not exist' });
      }
  
      return res.status(200).json(order);
    }
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};