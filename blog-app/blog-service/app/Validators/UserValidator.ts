import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Sort from 'App/Utils/Sort'
import pick from 'lodash/pick'

// when admin is updating a user
export class UserUpdate {
  public static schemaMap = {
    username: schema.string.optional({ trim: true }, [rules.fullName()]),
    role: schema.enum.optional(User.roles),
    isVerified: schema.boolean.optional(),
    isActive: schema.boolean.optional(),
    isBanned: schema.boolean.optional()
  }

  public static messages = {
    required: '{{ field }} is required to update user',
  }

  // if we didn't used this schema.create(userUpdate) then we'll get the error because it is mandatory to user schema.create to define the schema
  public schema = schema.create(UserUpdate.schemaMap)
  public messages = UserUpdate.messages
}

// when user is updating own self 
// because of public static schemaMap we can access that properties their as well because of the keyword (static)
export class UserUpdateMe {
  // when user is updating own details then user can only update username
  // pick is used to pick specific value
  public schema = schema.create(pick(UserUpdate.schemaMap, ['username']))
  public messages = UserUpdate.messages
}

export class UserCreate {
  public schema = schema.create({
    username: schema.string({ trim: true }, [rules.fullName()]),
    email: schema.string({ trim: true }, [
      rules.email()
    ]),
    role: schema.enum.optional(User.roles),
    isVerified: schema.boolean.optional(),
    isActive: schema.boolean.optional(),
    password: schema.string({}, [rules.minLength(6), rules.confirmed('passwordConfirmation')])
  })

  public messages: CustomMessages = {
    // if user didn't put correct email format
    'email.email': 'Invalid email address',
    required: "{{ field }} is required to create user"
  }
}

export class UserList {
  public static schema = schema.create({
    id: schema.number.optional(),
    username: schema.string.optional({ escape: true }),
    email: schema.string.optional({ escape: true }),
    created_at: schema.date.optional({ format: 'yyyy-MM-dd' }),
    updated_at: schema.date.optional({ format: 'yyyy-MM-dd' })
  })
  public static messages = {}
}

export class UserListFilters {
  public static schema = schema.create({
    sort: schema.object.optional().members({
      // enum is for available choice like here Sort.type have two available choice either asc or desc
      id: schema.enum.optional(Sort.types),
      username: schema.enum.optional(Sort.types),
      email: schema.enum.optional(Sort.types),
      role: schema.enum.optional(Sort.typesRole),
      uploadedBy: schema.enum.optional(Sort.types),
      isVerified: schema.enum.optional(Sort.typesBooleam),
      isActive: schema.enum.optional(Sort.typesBooleam),
      isBanned: schema.enum.optional(Sort.typesBooleam),
      createdAt: schema.enum.optional(Sort.dateValue),
      updatedAt: schema.enum.optional(Sort.dateValue),
    }),
  })
  public static messages = {}
}