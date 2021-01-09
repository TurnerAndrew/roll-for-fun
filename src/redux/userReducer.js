//initial state
const initialState = {
    username: null,
    user_id: null,
}

//action constant
const GET_USER_DATA = 'GET_USER_DATA'

//action creator
export const getUserData = (user) => {
    return {
        type: GET_USER_DATA,
        payload: user,
    }
}

//reducer function
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA:
            const {username, user_id} = action.payload
            return {username, user_id}
        default:
            return state
    }
}