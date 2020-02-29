import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      Food: "nav-link",
      Drink: "nav-link",
      all_class: "nav-link active",
      name: '',
      description: "",
      image: '',
      price: '0',
      stock: '0',
      id_category: '0',
      realCategory: '',
      formStatus: 'Add',
      productIdSelected: null,
      activeCategory: '',
      searchName: '',
    }
  }
  
  // When nav clicked
  onClickMenu = (event) => {
    event.preventDefault()
    this.setState({
      all_class: 'nav-link',
      Food: 'nav-link',
      Drink: 'nav-link',
      [event.target.name]: 'nav-link active',
      activeCategory: event.target.id
    });
    if (event.target.id === '') this.setState({ activeCategory: '' })
    axios
      .get(`http://localhost:8001/product/?category=${event.target.id}`)
      .then(res => {
        this.setState({ products: res.data.result })
      })
      .catch(err => {
        console.log(err)
      })
  }

  // When Searching..
  onChangeSearch = (event) => {
    this.setState({
      all_class: "nav-link active",
      Food: "nav-link",
      Drink: "nav-link",
      searchName: event.target.value
    })
    axios
      .get(`http://localhost:8001/product/?name=${event.target.value}`)
      .then(res => {
        this.setState({
          products: res.data.result,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  // on Input of Form changed..
  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  // When user input Image File..
  handleFileChange = e => {
    this.setState({ [e.target.name]: e.target.files[0] })
  }

  // Form submit
  onSubmitHandler = event => {
    event.preventDefault();
    let formData = new FormData();

    formData.append("image", this.state.image);
    formData.append("name", this.state.name);
    formData.append("description", this.state.description);
    formData.append("id_category", this.state.id_category);
    formData.append("price", this.state.price);
    formData.append("stock", this.state.stock);
    if (this.state.formStatus === "Add") {
      this.postData(formData);
    } else if (this.state.formStatus === "Edit") {
      if (this.state.image === "") {
        formData.delete("image");
        this.patchData(formData);
      } else {
        this.patchData(formData);
      }
    }
    this.setState({
      name: '',
      image: '',
      id_category: 0,
      price: '-',
      stock: '-'
  })
  };

  // Add Data
  postData = (formData) => {
    axios
    .post(`http://localhost:8001/product/`, formData)
    .then(res => {
      console.log(res, "Data has been added");
      alert("Data has been Added..");
      this.componentDidMount();
    });
  };

  // Edit Data..
  patchData = (formData) => {
    const options = {
      method: "PATCH",
      body: formData
    };
    fetch(
      `http://localhost:8001/product/${this.state.productIdSelected}`,
      options
    ).then(res => {
      console.log(res, "Data Succes updated");
      alert("data success updates");
      this.componentDidMount();
    });
  };

  // add button
  addButtonHandler = () => {
  this.setState({
      formStatus: 'Add',
      name: '',
      image: '',
      id_category: 0,
      price: '-',
      stock: '-'
  })
  }

  // edit button
  editButtonHandler = (product) => {
    if (product.category === 'Food') {
      this.setState({ category: 1 })
    }
    if (product.category === 'Drink') {
      this.setState({ category: 2 })
    }
    this.setState({
      name: product.name,
      description: product.description,
      image: '',
      price: product.price,
      stock: product.stock,
      productIdSelected: product.id,
      formStatus: 'Edit'
    })
  }

  // Delete button..
  deleteButtonHandler = (productId) => {
    const options = {
      method: "DELETE"
    }
    fetch(`http://localhost:8001/product/${productId}`, options)
      .then(res => {
        console.log(res)
        this.componentDidMount()
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    const authorization = localStorage.getItem('token');
    const userId = localStorage.getItem("user-id");
    if (!localStorage.getItem('token')) {
        this.props.history.push('/login');
    }
    axios
      .get(`http://localhost:8001/product/`, {
        headers: {
          "authorization": authorization,
          "user-id": userId
        }
      })
      .then(res => {
        console.log(res)
          this.setState({
              products: res.data.result,
          })
      })
      .catch(err => {
          console.log(err)
      })
  }

  onLogout = () => {
    localStorage.removeItem('user-id');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuth');
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        {/* Navbar */}
        <div className="row">
          <div className="col-md-9 ">
            <nav className="navbar sticky-top navbar-expand-lg navbar-light" style={{ background: 'white' }} >
              <div className="container">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <h3 className="add" onClick={this.addButtonHandler}>
                <button type="button" data-toggle="modal"
              data-target="#add" style={{backgroundColor: 'transparent', border:'0px solid black'}}>
                  <i style={{color: 'blue'}} className="fas fa-plus"></i>
                </button>
                </h3>
                <a className="navbar-brand" style={{marginLeft: '10%'}} id="" name="all_class" onClick={this.onClickMenu} href="/"><b>CoffeShop</b></a>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className={this.state.all_class} id="" name="all_class" onClick={this.onClickMenu} to="/">All</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={this.state.Food} id="Food" name="makanan" onClick={this.onClickMenu} to="?category=Food">Food</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={this.state.Drink} id="Drink" name="minuman" onClick={this.onClickMenu} to="?category=drink">Drink</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link a" to="/login" id="" name="all_class" onClick={this.onLogout}>Logout</Link>
                        </li>
                    </ul>
                  <form className="form-inline my-3 my-lg-0" style={{marginLeft: ''}}>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" onChange={this.onChangeSearch} />
                  </form>
                </div>
              </div>
            </nav >

            {/* Card Product */}
            <div className="row products" style={{ backgroundColor: 'silver' }}>
              {this.state.products.map((product, index) =>
                <div className="product-card col-md-6 col-lg-4" key={product.id}>
                  <div className="card">
                    <img src={product.image} className="card-img-top" alt="" />
                    <div className="card-body">
                      <div style={{ float: 'left', marginLeft: '-10px'}}>
                        <p className="card-text" style={{ marginTop: '-15px' }}>{product.name}</p>
                        <h6 className="card-title" style={{ marginTop: '-15px' }}>
                          Rp. {product.price}
                        </h6>
                      </div>
                      <div style={{ marginTop: '-6px' }}>

                        <button onClick={() => this.editButtonHandler(product)} style={{backgroundColor: 'transparent', border:'0px', marginLeft: '90px'}} data-toggle="modal" data-target="#edit">
                         <i style={{color: 'green'}} className="fas fa-edit fa-2x"></i>
                         </button>

                        <button onClick={() => this.deleteButtonHandler(product.id)} style={{backgroundColor: 'transparent', border:'0px', marginLeft: '13px'}}>
                        <i style={{color: 'red'}} className="fas fa-trash-alt fa-2x"></i>
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cart */}
          <div className="col-md-3">
            <div className="row" style={{ paddingRight: '5%' }}>
              <div className="col-md-12" style={{ textAlign: 'center', position: 'relative', marginTop: '20px' }}>
                <h6 style={{ borderBottom: '2px solid rgba(0,0,0,.2)', height: '38px' }}>Cart
                <span className="badge badge-primary badge-pill">0</span></h6>
              </div>
            </div>
          </div>
        </div>

        {/* Modal add */}
        <div
          className="modal fade"
          id="add"
          tabindex="-1"
          role="dialog"
          aria-labelledby="addModal"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {this.state.formStatus} Item
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form encType="multipart/form-data" onSubmit={this.onSubmitHandler}>
                  <div className="form-group">
                    <label className="col-form-label">Name:</label>
                    <input
                      placeholder="Product Name..."
                      value={this.state.name}
                      required
                      className="form-control"
                      type="text"
                      name="name"
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Description:</label>
                    <textarea
                      placeholder="Description..."
                      value={this.state.description}
                      required
                      className="form-control"
                      type="text"
                      name="description"
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Image:</label>
                    <input
                      className="form-control-file"
                      type="file"
                      name="image"
                      onChange={this.handleFileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Price:</label>
                    <input
                      required
                      placeholder="Price..."
                      value={this.state.price}
                      className="form-control"
                      type="number"
                      name="price"
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Stock:</label>
                    <input
                      placeholder="Stock..."
                      value={this.state.stock}
                      required
                      className="form-control"
                      type="number"
                      name="stock"
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div className="form-group">
                  <label className="col-form-label">IDCategory:</label>
                  <select className="form-control" required name="id_category" onChange={this.onChangeHandler}>
                    <option selected disabled>Choose category</option>
                    <option value={1}>Food</option>
                    <option value={2}>Drink</option>
                  </select>
                  </div>
                  <div className="modal-footer">
                    <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    SUBMIT
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Edit */}
        <div
          className="modal fade"
          id="edit"
          tabindex="-1"
          role="dialog"
          aria-labelledby="editModal"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                {this.state.formStatus} Item
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form  encType="multipart/form-data" onSubmit={this.onSubmitHandler}>
                  <div className="form-group">
                    <label className="col-form-label">Name:</label>
                    <input
                      placeholder="Product Name..."
                      value={this.state.name}
                      onChange={this.onChangeHandler}
                      required
                      type="text"
                      name="name"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Description:</label>
                    <textarea
                      placeholder="Product Name..."
                      value={this.state.description}
                      onChange={this.onChangeHandler}
                      required
                      type="text"
                      name="description"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Image:</label>
                    <input
                      name="image"
                      type="file"
                      className="form-control"
                      onChange={this.handleFileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Price:</label>
                    <input
                      required
                      placeholder="Price..."
                      value={this.state.price}
                      className="form-control"
                      type="number"
                      name="price"
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Stock:</label>
                    <input
                      placeholder="Stock..."
                      value={this.state.stock}
                      required
                      className="form-control"
                      type="number"
                      name="stock"
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div className="form-group">
                  <label className="col-form-label">IDCategory:</label>
                  <select className="form-control" required name="id_category" onChange={this.onChangeHandler}>
                    <option selected disabled>Choose category</option>
                    <option value={1}>Food</option>
                    <option value={2}>Drink</option>
                  </select>
                  </div>
                  <div className="modal-footer">
                  <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      SUBMIT
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
}
export default Products
