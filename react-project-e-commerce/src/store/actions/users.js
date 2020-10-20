export const signInUser = (User) => ({
    type: "SIGNIN_USER",
    name: User.name,
    email: User.email,
    id: User.id,
    token: User.token,
   
})

