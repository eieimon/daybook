export const API_ENDPOINT = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  FORGOT_PASSWORD: "/auth/password/forgot",
  RESET_PASSWORD: "/auth/password/reset",
  REFRESH_TOKEN: "/auth/refresh-token",
  GET_USER_PROFILE: "/user/profile",
  UPDATE_USER_PROFILE: "/user/profile/update",
  GET_ALL_TASKS: "/tasks",
  CREATE_TASK: "/tasks/create",
  UPDATE_TASK: "/tasks/update",
  DELETE_TASK: "/tasks/delete",
} as const;
