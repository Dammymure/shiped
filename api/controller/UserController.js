import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js";
import Order from "../models/Order.js";


export const createAccount = async (req, res) => {
    try {
     const {
      email,
      password,
     } = req.body;
   
     // Check if a user already exists using the email
     const existingUser = await User.findOne({ email: email });
   
     // If user exists, give an error message
     if (existingUser) {
      return res.status(403).json({ msg: 'User already exists', existingUser });
     }
   
     // Hash the password
     const salt = await bcrypt.genSalt();
     const passwordHash = await bcrypt.hash(password, salt);
   
     // Create a new user
     const newUser = await User.create({
      email,
      password: passwordHash,
      salt:salt,
      firstname: "",
      lastname: "",
      address:"",
      phone:"",
      lat:0,
      lng: 0
     });
     await newUser.save();
   
     res.status(201).json(newUser);
    } catch (err) {
     res.status(500).json({ error: err.message });
    }
   };


    //    LOGIN
   export const loginUser = async (req, res) => {
    try {
     const { email, password } = req.body
     // Checking if the user exists
     const user = await User.findOne({ email: email })
     if (!user) return res.status(400).json({ msg: "User does not exist" })

     // then check user password for match
     const isMatch = bcrypt.compare(password, user.password)
     if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" })
        
     // JWT SIGNING
     const token = jwt.sign({ user: user, type: "user" }, process.env.JWT_SECRET)
     delete user.password
    //  req.activeuser = user
    // req.user = user //loggin in active user

    console.log(`Login Good: ${user}`)
     res.status(200).json({ token, user })

   
    } catch (err) {
     res.status(500).json({ error: err.message })
    }
   }

//    GET PROFILE
export const GetUserProfile = async ( req, res) => {
    const user = req.user;

    if (user) {
      const profile = await User.findById(user.user._id);
  
      if (profile) {
        return res.status(200).json(profile);
      }
    }
  
    res.status(400).json({ message: "Error with fetch profile" });
  };

//   UPDATE PROFILE
export const UpdateProfile = async (req, res) => {
  const user = req.user;
  const { firstname, lastname, address, phone } = req.body;

  try {
      if (user) {
          const profile = await User.findById(user.id);

          if (profile) {
              // Update only the fields that are provided in the request body
              if (firstname) profile.firstname = firstname;
              if (lastname) profile.lastname = lastname;
              if (address) profile.address = address;
              if (phone) profile.phone = phone;

              // Save the updated profile
              await profile.save();

              res.status(200).json({
                  message: 'Profile updated successfully',
                  profile
              });
          } else {
              res.status(404).json({ message: 'User not found' });
          }
      } else {
          res.status(401).json({ message: 'Unauthorized access' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// PLACE/create DELIVERY ORDER
export const placeOrder = async (req, res) => {
  const user = req.user;
  // const items = req.body
  const {destination, packages, price, status, currentLocation, deliveryLocation  } = req.body

  try {
    const findUser = await User.findById(user.user._id)

    if(!findUser){
      return res.status(404).json({ message: "User not found" });
    }

    const orderId = `${Math.floor(Math.random() * 89999)+ 1000}`;
    const userId = findUser._id

    // findUser.package =

    const userOrder = await Order.create({
      orderId: orderId,
      userId: userId,
      packages: packages,
      status: status,
      price: price,
      destination: destination,
      deliveryLocation: deliveryLocation,
      currentLocation: currentLocation
  })

  findUser.orders.push(userOrder);

  const profileUpdate =  await findUser.save();

  console.log("Order Placed");
  return res.status(200).json(profileUpdate);
  


  } catch (error) {

    res.status(500).json({ message: 'Server error', error: error.message });

  }
}


// GET DELIVERIES
export const getOrders = async (req, res) => {
  const user = req.user;  // Assuming req.user is being set correctly via middleware

  try {
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' }); // Return if no user
    }

    const profile = await User.findById(user.user._id).populate({
      path: 'orders',
      model: 'order', // Ensure 'order' model is correctly referenced
    }); // Populate orders

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' }); // Return 404 if no profile
    }

    return res.status(200).json(profile.orders); // Return the populated orders
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// GET ONE DELIVERY
export const getOneOrder = async (req, res) => {
  // const user = req.user;
  const orderId = req.params.id;

  try {
    if (orderId) {
      const order = await Order.findOne({orderId:orderId})
  
      return res.status(200).json(order);
    }
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


//    Log out
export const LogOutUser = async ( req, res) => {
  const user = req.user;

  if (user) {
    req.user = null
    return res.status(200).json("Logged out");
  }
  console.log("Logged out user");
  

  res.status(400).json({ message: "Error with login out profile" });
};

//    Log out
export const Auth = async ( req, res) => {
  const user = req.user;

  if (user) {
    console.log("check User");
    return res.status(200).json(user.user);
  }
  

  res.status(400).json({ message: "Error with login out profile" });
};