
const initialState = {
  products: [],
  pages: []
}

const Product = (state = initialState, action) => {
  // console.log(action.type)
  switch (action.type) {
    case 'GET_PRODUCTS_PENDING':
      return {
        ...state
      }
    case 'GET_PRODUCTS_REJECTED':
      return {
        ...state
      }
    case 'GET_PRODUCTS_FULFILLED':
      // console.log('haloo', action.payload.data)
      return {
        ...state,
        products: action.payload.data.result,
        pages: action.payload.data.totalPages
      }

    case 'POST_PRODUCT_PENDING':
      return {
        ...state
      }

    case 'POST_PRODUCT_REJECTED':
      return {
        ...state
      }

    case 'POST_PRODUCT_FULFILLED':
      const newDataProduct = [...state.products, action.payload.data.result]
      // console.log(action.payload)
      return {
        ...state,
        products: newDataProduct
      }

    case 'UPDATE_PRODUCT_PENDING':
      return {
        ...state,
        isLoading: true
      }

    case 'UPDATE_PRODUCT_REJECTED':
      return {
        ...state,
        isLoading: true
      }

    case 'UPDATE_PRODUCT_FULFILLED':
      const newProductAfterUpdate = state.products.map(product => {
        // console.log(action.payload)
        if (product.id === parseInt(action.payload.data.result.id)) {
          return action.payload.data.result
        }
        return product
      })
      return {
        ...state,
        isLoading: false,
        products: newProductAfterUpdate
      }

    case 'DELETE_PRODUCT_PENDING':
      return {
        ...state,
        isLoading: true
      }

    case 'DELETE_PRODUCT_REJECTED':
      return {
        ...state,
        isLoading: true
      }

    case 'DELETE_PRODUCT_FULFILLED':
      const newProductAfterDelete = state.products.filter(product => product.id !== parseInt(action.payload.data.result))
      return {
        ...state,
        isLoading: false,
        products: newProductAfterDelete
      }

    case 'SEARCH_PRODUCT_PENDING':
      return {
        ...state
      }
    case 'SEARCH_PRODUCT_REJECTED':
      return {
        ...state
      }
    case 'SEARCH_PRODUCT_FULFILLED':
      return {
        ...state,
        products: action.payload.data.result
      }

    case 'FILTER_PRODUCT_PENDING':
      return {
        ...state
      }
    case 'FILTER_PRODUCT_REJECTED':
      return {
        ...state
      }
    case 'FILTER_PRODUCT_FULFILLED':
      return {
        ...state,
        products: action.payload.data.result
      }
    default:
      return state
  }
}

export default Product
