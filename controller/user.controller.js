import userModel from "../model/user.model.js";
import bcryptjs from "bcryptjs";

//Sign up Code
export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check if the user already exists
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Secure or encrypt the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new user
    const createdUser = new userModel({
      fullname,
      email,
      password: hashedPassword, // Save the hashed password under 'password'
    });

    // Save the user to the database
    await createdUser.save();

    res.status(201).json({ message: "User created successfully" });
    console.log("User created successfully");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Write a Login Code

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
      const user = await userModel.findOne({ email })      //fetch db  and store in user variables
      const isMatch = await bcryptjs.compare(password, user.password) //it compare both user and db password
      
      if (!user || !isMatch) {
        return res.status(400).json({ message: "Invalid user  Details" });
      } else {
        res.status(200).json({
          message: "Login SuccessFully", 
          user: {
            _id: user._id,
            fullname: user.fullname,
            email:user.email,
        }})
      }
        
    } catch (error) {
      console.log( error.message);
      res.status(500).json({message:"Internal Server Error"})
        
    }
}
