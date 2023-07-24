export const noArticle = { 
  message: "No such article is found ", 
  status: 404 
};
export const noPermission = {
  message:
    "Insufficient access, you do not have permission to perform this action",
    status: 401
};
export const usernameExist = {
  message: "Username already exist",
  status: 409
};
export const emailExist = {
  message: "Email already exist",
  status: 409
};
export const invalidCredentials = {
  message: "Email or Password is incorrect",
  status: 400
};
export const noEmailFound = {
  message: "No user is registered with this email",
  status: 404
};
export const invalidURL = {
  message: "Invalid URL type", status: 400 
};

export const blogsFetched = "blogs fetched successfully";