
//initial state
const initialState = {
    username: null,
    user_id: null,
    first_name: null,
    profile_pic: null,
    isLoggedIn: false,
}

//action constant
const GET_USER_DATA = 'GET_USER_DATA'
const LOGOUT = 'LOGOUT'

//action creator
export const getUserData = (user) => {

    return {
        type: GET_USER_DATA,
        payload: user,
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
    }
}

//reducer function
export default function reducer(state = initialState, action) {

    switch (action.type) {
        case GET_USER_DATA:
            const {username, user_id, first_name, profile_pic} = action.payload
            return {username, user_id, first_name, profile_pic, isLoggedIn: true}
        case LOGOUT:
            return initialState
        default:
            return state
    }
}
