export const signInUser = (user) => ({
    type: "SIGNIN_USER",
    name: user.name,
    email: user.email,
    id: user.id,
    token: user.token,
    picture_profil: user.picture_profil,
   
})
export const signOutUser = () => ({
    type: "SIGNOUT_USER",
    name: null,
    email: null,
    id:null,
    token:null,
    picture_profil: null,
})

export const changeUserData = (data) => ({
    type: "CHANGE_USER_DATA",
    payload: data,
})

export const  deleteUserId = () => ({
    type: "DELETE_USER_ID",
})

