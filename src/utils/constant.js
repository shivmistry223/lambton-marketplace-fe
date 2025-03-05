export const PRODUCT_TYPES = [
  { label: "Books", value: "books" },
  { label: "Clothing", value: "clothing" },
  { label: "Electronics", value: "electronic" },
  { label: "Sports", value: "sport" },
];

export const PRODUCT = "http://localhost:5000/product";
export const LOGIN = "http://localhost:5000/login";
export const REGISTER = "http://localhost:5000/register";
export const RESET_PASSWORD = "http://localhost:5000/reset-password";
export const FORGOT_PASSWORD = "http://localhost:5000/forgot-password";
export const LOGOUT = "http://localhost:5000/logout";
export const IMAGEDIR = "http://localhost:5000";
export const PROFILE = "http://localhost:5000/user";
export const PROFILE_RESET_PASSWORD =
  "http://localhost:5000/profile-reset-password";

export const PRODUCT_DATA = {
  productName: "test3",
  productDescription: "test43",
  productimageUrl: "/products/1740689261956.jpg",
  productCatagory: "books",
  productPrice: 23,
  isSold: false,
  productOwner: {
    $oid: "67bb3f22190b36c9dea9da1d",
  },
  __v: 0,
};
