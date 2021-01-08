import axios from 'axios'

//initial state
const initialState = {
    username: null,
    user_id: null,
}

//action constant
const GET_USER_DATA = 'GET_USER_DATA'

//action creator
export const getUserData = () => {
    const data = axios.get('/auth/me').then((res) => res.data)

    return {
        type: GET_USER_DATA,
        payload: data,
    }
}

//reducer function
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA + '_FULFILLED':
            const {username, user_id} = action.payload.user
            return {username, user_id}
        default:
            return state
    }
}