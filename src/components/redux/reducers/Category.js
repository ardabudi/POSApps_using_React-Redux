
const initialState = {
  categorys: []
}

const Category = (state = initialState, action) => {
  // console.log(action.type)
  switch (action.type) {
    case 'GET_CATEGORY_PENDING':
      return {
        ...state
      }
    case 'GET_CATEGORY_REJECTED':
      return {
        ...state
      }
    case 'GET_CATEGORY_FULFILLED':
      return {
        ...state,
        categorys: action.payload.data.result
      }

    case 'POST_CATEGORY_PENDING':
      // console.log(action.payload)
      return {
        ...state
      }

    case 'POST_CATEGORY_REJECTED':
      return {
        ...state
      }

    case 'POST_CATEGORY_FULFILLED':
      const newDataCategory = [...state.categorys, action.payload.data.result]
      return {
        ...state,
        categorys: newDataCategory
      }

    case 'UPDATE_CATEGORY_PENDING':
      return {
        ...state
      }

    case 'UPDATE_CATEGORY_REJECTED':
      return {
        ...state
      }

    case 'UPDATE_CATEGORY_FULFILLED':
        // console.log(action.payload)
      const newCategoryAfterUpdate = state.categorys.map(category => {
        if (parseInt(category.id) === parseInt(action.payload.data.result.id)) {
          return action.payload.data.result
        }
        return category
      })
      return {
        ...state,
        categorys: newCategoryAfterUpdate
      }

    case 'DELETE_CATEGORY_PENDING':
      return {
        ...state,
        isLoading: true
      }

    case 'DELETE_CATEGORY_REJECTED':
      return {
        ...state,
        isLoading: true
      }

    case 'DELETE_CATEGORY_FULFILLED':
      const newCategoryAfterDelete = state.categorys.filter(category => category.id !== parseInt(action.payload.data.result))
      return {
        ...state,
        isLoading: false,
        categorys: newCategoryAfterDelete
      }

    case 'SEARCH_CATEGORY_PENDING':
      return {
        ...state
      }
    case 'SEARCH_CATEGORY_REJECTED':
      return {
        ...state
      }
    case 'SEARCH_CATEGORY_FULFILLED':
      return {
        ...state,
        categorys: action.payload.data.result
      }
    default:
      return state
  }
}

export default Category

