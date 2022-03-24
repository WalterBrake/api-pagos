//import the User model
import { User,Payment } from "../../db/models/";
/**
 *
 * function to create user
 *  
 */

export async function createUser(req, res, next) {
  try {
    //get the request data
    const { name, telephone } = req.body;

    //create the user 
    let newUser = await User.create({
      name,
      telephone,
    });
    //evaluate if was created the user
    if (newUser) {
      res.json({
        code: 1000,
        message: "success",
        data: {
          user: newUser,
        },
      });
    } else {
      throw new Error("Cannot create record");
    }
  } catch (e) {
    //wrong case return error
    res.status(500).json({
      code: 2000,
      message: "Something goes wrong" + e,
      data: {},
    });
  }
}

/**
 *
 * function to get all users
 *
 */
export async function getUsers(req, res) {
  try {
    //Get all users
    let users = await User.findAll({
      include: [{
        model: Payment,
    }]
    });

    //evaluate if there are records
    if (users.length !== 0) {
      //Success
      res.json({
        code: 1000,
        message: "Success",
        data: users,
      });
    } else {
      //There is not users
      res.json({
        code: 1000,
        message: "There is not user",
        data: [],
      });
    }
  } catch (e) {
    //wrong case return error
    res.status(500).json({
      code: 2000,
      message: "Something goes wrong: " + e,
      data: {},
    });
  }
}
