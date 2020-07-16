

const initialState = {
    email: null,
    password: null,
};

export const registrationReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        // case USER_LOGIN: {
        //     return {...newState, token: action.payload, authenticated: true};
        // }
        default:
            return state;
    }
};
