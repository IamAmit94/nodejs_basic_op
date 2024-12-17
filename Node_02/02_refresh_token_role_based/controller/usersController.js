import User from "../models/User.js";

export const userDetails =  (req, res) => { // for the access of specific user
	res.status(200).json({ message: "user authenticated." });
}


export const updateRole = async (req, res) => {
    try {
      console.log('Updating the role of user!');
  
      const { userName } = req.params; // Extract `userName` from params
      const updatedRoles = req.body.roles; // Extract the roles from request body
  
      // Perform the database update
      const userRole = await User.findOneAndUpdate(
        { userName }, // Query: Find user by username
        { roles: updatedRoles }, // Update: Set new roles
        { new: true } // Return the updated document
      );
  
      if (!userRole) {
        return res.status(404).json({
          error: true,
          message: 'User not found',
        });
      }
  
      console.log('User role updated successfully!', userRole.toJSON()); // Convert to JSON to avoid circular reference
      res.status(200).json({
        error: false,
        message: 'User role updated successfully',
        // data: userRole.toJSON(), // Send only the JSON representation
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      res.status(500).json({
        error: true,
        message: 'Internal Server Error',
      });
    }
  };
  
  