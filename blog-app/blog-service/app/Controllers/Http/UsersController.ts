import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import {
  UserCreate,
  UserUpdate,
  UserUpdateMe,
} from "App/Validators/UserValidator";

export default class UsersController {
  public async getMe({ auth }: HttpContextContract) {
    return { data: auth.user?.toJSON() };
  }

  public async getAllUser({ params }: HttpContextContract) {
    // const response = await User.all();
    const query = User.query();

    let response;
    // if user wanted to see allBlogs uploaded by him
    if (params.page) {
      response = await query.paginate(params.page || 1, 10);
    } else {
      response = await query;
    }
    return { message: "Users fetched successfully", data: response };
  }

  public async getById({ params }: HttpContextContract) {
    try {
      const user = await User.findBy("id", params.id);
      if (!user) {
        throw { message: "No Article found by id", status: 404 };
      } else {
        return {
          message: "User fetched successfully",
          data: user
        };
      }
    } catch (e) {
      throw e;
    }
  }

  public async create({ request }: HttpContextContract) {
    try {
      const body = await request.validate(UserCreate);
      const user = await User.create(body);
      // calling refresh to get latest data from database
      await user.refresh();
      return {
        message: `User ${user.username} registered successfully`,
        data: user.toJSON(),
      };
    } catch (e) {
      if (e.sqlMessage) {
        if (e.sqlMessage.includes("users.users_username_unique")) {
          throw {
            message: "Username already exist",
            status: 409,
          };
        } else if (e.sqlMessage.includes("users.users_email_unique")) {
          throw {
            message: "Email already exist",
            status: 409,
          };
        }
      }
      throw e;
    }
  }

  public async update({ request, params, auth }: HttpContextContract) {
    try {
      const userId = params.id || auth.user?.id;
      let body;
      if (params.id) {
        body = await request.validate(UserUpdate);
      } else {
        body = await request.validate(UserUpdateMe);
      }
      // if admin tries to update user who doesn't exist
      const user = await User.findBy("id", userId);

      if (
        // so if user tries to udpate own self then only username will fetch therefore we've created a condition !params.id when user update own self then check username
        (!params.id && body.username === user?.username) ||
        body.username === user?.username &&
        body.role === user?.role &&
        body.isActive === user?.isActive &&
        body.isVerified === user?.isVerified &&
        body.isBanned === user?.isBanned
      ) {
        throw {
          message: "Can't update, values are same as of before",
          status: 401,
        }
      }

      if (!user) {
        throw {
          message: "User not found",
          status: 404,
        };
      }
      // if admin tries to update super-admin
      if (!auth.user!.hasAccess(user.role)) {
        throw {
          message: "In sufficient access",
          status: 401,
        };
      }
      // once use merge then call the save method
      user?.merge(body);
      await user?.save();
      return {
        message:
          (params.id ? "User" : "Yours") + " details updated successfully",
        data: user?.toObject(),
      };
    } catch (e) {
      if (e.sqlMessage) {
        if (e.sqlMessage.includes("users.users_username_unique")) {
          throw {
            message: "Username already exist",
            status: 409,
          };
        }
      }
      throw e;
    }
  }
}
