const initState = {
    users: [
    ]
}
const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            let user = { user: action.payload }
            return { ...state, users: [...state.users, user] };

        default:
            return state;

    }
}
export default rootReducer;