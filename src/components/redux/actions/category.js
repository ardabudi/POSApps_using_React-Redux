import axios from 'axios'

export const getCategory = (data) => {
  const name = data.searchName || ''
  return {
    type: 'GET_CATEGORY',
    payload: axios({
      method: 'GET',
      url: `http://localhost:8001/category/?name=${name}`
    })
  }
}

export const postCategory = (data) => {
  return {
    type: 'POST_CATEGORY',
    payload: axios({
      method: 'POST',
      url: 'http://localhost:8001/category',
      data: data
    })
  }
}

export const updateCategory = (categoryId, data) => {
  // const authorization = localStorage.getItem('token')
  // const userId = localStorage.getItem('user-id')
  return {
    type: 'UPDATE_CATEGORY',
    payload: axios({
      method: 'PATCH',
      url: `http://localhost:8001/category/${categoryId}`,
      data: data
      // headers: {
      //   authorization: authorization,
      //   'user-id': userId
      // }
    })
  }
}

export const deleteCategory = (categoryId) => {
  return {
    type: 'DELETE_CATEGORY',
    payload: axios({
      method: 'DELETE',
      url: `http://localhost:8001/category/${categoryId}`
    })
  }
}




// export const searchCategory = (data) => {
//   // const authorization = localStorage.getItem('token')
//   // const userId = localStorage.getItem('user-id')
//   return {
//     type: 'SEARCH_CATEGORY',
//     payload: axios({
//       method: 'GET',
//       url: `http://localhost:8001/category/?name=${data}`
//       // headers: {
//       //   authorization: authorization,
//       //   'user-id': userId
//       // }
//     })
//   }
// }

// export const detailCategory = (event) => {
//   return {
//     type: 'DETAILS_CATEGORY',
//     payload: axios({
//       method: 'GET',
//       url: `http://localhost:8001/category?name=${event}`
//     })
//   }
// }
