import axios from 'axios'

export const getProducts = (data) => {
  const limit = 5
  const page = data.activePage || 1
  const category = data.activeCategory || ''
  const name = data.searchName || ''
  const sortBy = data.sortBy || 'id'
  const orderBy = data.orderBy || 'ASC'
  return {
    type: 'GET_PRODUCTS',
    payload: axios({
      method: 'GET',
      url: `http://localhost:8001/product/?limit=${limit}&page=${page}&category=${category}&name=${name}&sortby=${sortBy}&orderBy=${orderBy}`
    })
  }
}

export const postProducts = (data) => {
  return {
    type: 'POST_PRODUCT',
    payload: axios({
      method: 'POST',
      url: 'http://localhost:8001/product',
      data: data
    })
  }
}

export const updateProduct = (productId, data) => {
  // const authorization = localStorage.getItem('token')
  // const userId = localStorage.getItem('user-id')
  return {
    type: 'UPDATE_PRODUCT',
    payload: axios({
      method: 'PATCH',
      url: `http://localhost:8001/product/${productId}`,
      data: data
      // headers: {
      //   authorization: authorization,
      //   'user-id': userId
      // }
    })
  }
}

export const deleteProduct = (productId) => {
  return {
    type: 'DELETE_PRODUCT',
    payload: axios({
      method: 'DELETE',
      url: `http://localhost:8001/product/${productId}`
    })
  }
}





// export const detailProducts = (event) => {
//   return {
//     type: 'DETAILS_PRODUCT',
//     payload: axios({
//       method: 'GET',
//       url: `http://localhost:8001/product?name=${event}`
//     })
//   }
// }
