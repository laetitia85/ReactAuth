export const signInUser = (user) => ({
    type: "SIGNIN_USER",
    email: user.email,
    id: user.id,
    token: user.token,
   
})
export const signOutUser = () => ({
    type: "SIGNOUT_USER",
    email: null,
    id:null,
    token:null
})

