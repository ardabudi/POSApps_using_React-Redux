
const initialState = {
    user: []
}

const User = (state = initialState, action) => {
    // console.log(action.type)
    switch (action.type) {
        case 'GET_USER_PENDING':
            return {
                ...state
            }
        case 'GET_USER_REJECTED':
            return {
                ...state
            }
        case 'GET_USER_FULFILLED':
            return {
                ...state,
                user: action.payload.data.result
            }

        case 'POST_USER_PENDING':
            // console.log(action.payload)
            return {
                ...state
            }

        case 'POST_USER_REJECTED':
            return {
                ...state
            }

        case 'POST_USER_FULFILLED':
            const newDataUser = [...state.user, action.payload.data.result]
            return {
                ...state,
                user: newDataUser
            }

        case 'UPDATE_USER_PENDING':
            return {
                ...state
            }

        case 'UPDATE_USER_REJECTED':
            return {
                ...state
            }

        case 'UPDATE_USER_FULFILLED':
            // console.log(action.payload)
            const newUserAfterUpdate = state.user.map(user => {
                if (parseInt(user.id) === parseInt(action.payload.data.result.id)) {
                    return action.payload.data.result
                }
                return user
            })
            return {
                ...state,
                user: newUserAfterUpdate
            }

        case 'DELETE_USER_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'DELETE_USER_REJECTED':
            return {
                ...state,
                isLoading: true
            }

        case 'DELETE_USER_FULFILLED':
            const newUserAfterDelete = state.user.filter(user => user.id !== parseInt(action.payload.data.result))
            return {
                ...state,
                isLoading: false,
                user: newUserAfterDelete
            }

        case 'SEARCH_USER_PENDING':
            return {
                ...state
            }
        case 'SEARCH_USER_REJECTED':
            return {
                ...state
            }
        case 'SEARCH_USER_FULFILLED':
            return {
                ...state,
                user: action.payload.data.result
            }
        default:
            return state
    }
}

export default User

