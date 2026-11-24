export const setAuthCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/users",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
