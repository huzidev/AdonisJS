import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { validator } from '@ioc:Adonis/Core/Validator';
import { dateKeys, userFiltersKeys } from "App/Default/Filters";
import { emailExist, invalidURL, usernameExist } from "App/Default/Messages";
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
      
      const filters = await validator.validate({
        schema: UserListFilters.schema,
        data: Utils.parseQS(request.qs(), ['sort'])
      })

      const isSort = Object.keys(request.qs())[1];

      // to check if user tries to change method in URL which should be sort if user tries to change it then throw error
      // it is compulsory to put isSort !== "sort" inside isSort so it won't run every time rather it'll only runs when user called the FILTERS
      // we can't called !userFilters.includes(filterResultKey) here because for that we needs filters so if user changes the METHOD in URL from sort to something else
      // then filter will became undefined and the isSort won't work therefore created these two seprately
      if (isSort) {
        if (isSort !== "sort") {
          throw invalidURL;
        }
      }
      
      let filterResultKey;
      let filterResultValue;
      if (!!filters.sort) {
        filterResultKey = Object.keys(filters.sort!)[0];
        filterResultValue = Object.values(filters.sort!)[0];
        console.log("FILTER VALUE", filterResultValue);
        // so when user tries to change the value from URL then throw error
        // if filters is according to username and user tries to change the value of username to something else then the error will be shown
          if (!userFiltersKeys.includes(filterResultKey)) {
            throw invalidURL;
          }
      }

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

      console.log(filterResultKey);
      

      let message;
      // so when user asked for filter then notifcation will be according to filter type
      if (!!filters.sort && response.totalNumber !== 0 && !dateKeys.includes(filterResultKey)) {
        message = `Users list fetched by ${
          filterResultKey === "role" 
          ? filters.sort?.role 
          : filterResultValue === "asc" 
          ? `ascending ${filterResultKey} order` 
          : filterResultValue === "desc"
          ? `descending ${filterResultKey} order`
          : filterResultValue === "true"
          ? `${filterResultKey} true state`
          : `${filterResultKey} false state`
        } successfully`
      } else if (!!filters.sort && response.totalNumber !== 0 && dateKeys.includes(filterResultKey)) {
        message = `Users list with ${
          filterResultValue === "oldest" 
          ? `oldest ${filterResultKey === "updatedAt" ? "updated" : ""} users`
          : `recently ${filterResultKey === "createdAt" ? "joined" : "updated"} users`
        } fetched successfully`
      } else if (response.totalNumber === 0) {
         // so if no user is found with specifc role and conditon then show that message in notification
        // if no one us banned then show no user found with isBanned true
        message = `No user found with ${filterResultKey} ${filterResultValue}`
      } else {
        message = `Users list ${params.page} fetched successfully`
      }

      return {
        message,
        data: response
      };
    } catch (e) {
      // so if validation error occurs when user change type for asc, desc, true etc to something else then validation error will trigger hence show Inavalid URL message instead of E_VALIDATION_FAILURE message
      throw { message: e.message.includes("E_VALIDATION_FAILURE") ? invalidURL.message : e.message };
    }
  }

  public async getById({ params }: HttpContextContract) {
    try {
      const user = await User.findBy("id", params.id);
      console.log("user status", user?.isBanned);
      if (!user) {
        throw { message: `No User found by id ${params.id}`, status: 404 };
      } else {
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
          throw usernameExist
        } else if (e.sqlMessage.includes("users.users_email_unique")) {
          throw emailExist
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
          throw usernameExist
        }
      }
      throw e;
    }
  }
}
