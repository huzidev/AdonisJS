import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { validator } from '@ioc:Adonis/Core/Validator';
import User from "App/Models/User";
import Utils from "App/Utils";
import {
  UserCreate,
  UserListFilters,
  UserUpdate,
  UserUpdateMe,
} from "App/Validators/UserValidator";

export default class UsersController {
  public async getMe({ auth }: HttpContextContract) {
    return { data: auth.user?.toJSON() };
  }

  public async getAllUser({ params, request }: HttpContextContract) {
    try {
      // const response = await User.all();
      const query = User.query();
      
      console.log("QS", request.qs());

      const filters = await validator.validate({
        schema: UserListFilters.schema,
        data: Utils.parseQS(request.qs(), ['sort'])
      })

      console.log("Filters", filters);
      

      let response;
      // if user wanted to see allBlogs uploaded by him
      if (params.page) {
        response = await query
          .withScopes((scope) => scope.filtersSort(filters))
          .paginate(params.page || 1, 10);
        if (params.page > response.lastPage) {
          throw {
            message: `Users page limit exceeds, Total pages are ${response.lastPage}`,
            status: 404
          };
        }
      } else {
        response = await query;
      }
      return {
        message: `Users list ${params.page} fetched successfully`,
        data: response
      };
    } catch (e) {
      throw e;
    }
  }

  public async getById({ params }: HttpContextContract) {
    try {
      const user = await User.findBy("id", params.id);
      if (!user) {
        throw { message: `No User found by id ${params.id}`, status: 404 };
      } 
      else {
        return {
          message: "User fetched successfully",
          data: user,
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

      if (!user) {
        throw {
          message: "User not found",
          status: 404,
        };
      }
      // if admin tries to update super-admin therefore we haven't used isAdmin
      if (!auth.user!.hasAccess(user.role)) {
        throw {
          message: "Insufficient access, you do not have permission to perform this action",
          status: 401,
        };
      } // first it'll chech if user has access to perfrom this action then it'll check values that if they are same or not 
      else if (
        // so if user tries to udpate own self then only username will fetch therefore we've created a condition !params.id when user update own self then check username
        (!params.id && body.username === user?.username) ||
        (body.username === user?.username &&
          body.role === user?.role &&
          body.isActive === user?.isActive &&
          body.isVerified === user?.isVerified &&
          body.isBanned === user?.isBanned)
      ) {
        throw {
          message: "Can't update, values are same as of before",
          status: 401,
        };
      }
      // once use merge then call the save method
      user?.merge(body);
      await user?.save();
      return {
        message:
          (params.id ? "User" : "Yours") + " details updated successfully",
          data: user?.toObject()
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
