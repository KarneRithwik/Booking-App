export { default } from "next-auth/middleware";
//if user is not logged in then the user cannot access these pages
export const config = {
    matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};
