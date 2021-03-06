import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { checkout, manipulateQuantity, deleteFromCart } from '../redux/actions/cart'
import logo from '../../assets/img/cart.png'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cashier: localStorage.getItem("user-id"),
      tPrice: 0,
      change: 0,
      pay: '-',
      isDisabled: true
    }
  }

  payment = e => {
    this.setState({
      pay: e.target.value
    })
    if (e.target.value >= this.state.tPrice) {
      this.setState({
        isDisabled: false,
        change: e.target.value - this.state.tPrice
      });
    } else {
      this.setState({ isDisabled: true, change: 0 });
    }
  };

  addQuantity = data => {
    if (data.quantity < data.stock) {
      data.quantity += 1;
      this.props.dispatch(manipulateQuantity(data));
    }
  };

  reduceQuantity = data => {
    if (data.quantity > 1) {
      data.quantity -= 1;
      this.props.dispatch(manipulateQuantity(data));
    }
  };

  deleteFromCart = id => {
    this.props.dispatch(deleteFromCart(id));
  };

  countTotal = () => {
    var total = 0;
    this.props.productsInCart.forEach(e => {
      total += e.price * e.quantity;
    });
    this.setState({
      tPrice: total
    });
  };

  purchaseHandler = () => {
    const data = {
      products: this.props.productsInCart
    };
    this.props.dispatch(checkout(data));
    var printcontent = document.getElementById("purchase-detail").innerHTML;
    window.frames["print_frame"].document.body.innerHTML =
      `<style>*{font-size:8px;} button{display:none}</style>` + printcontent;
    window.frames["print_frame"].window.focus();
    window.frames["print_frame"].window.print();
  };

  render() {
    console.log("iniiiiii", this.props.cart)
    const CheckoutButton = () => {
      if (this.state.isDisabled === true) {
        return (
          <button
            disabled={this.state.isDisabled}
            className="btn btn-info mt-3"
            style={{ cursor: "not-allowed" }}
          >
            Checkout
            </button>
        );
      } else {
        return (
          <button
            onClick={this.purchaseHandler}
            className="btn btn-info mt-3"
            data-dismiss="modal"
          >
            Checkout
            </button>
        );
      }
    };

    const PriceParsed = (data) => {
      return (
        <span>{data.data.toString().split('').reverse().join('').match(/\d{1,3}/g).join('.').split('').reverse().join('')}</span>
      )
    };

    const ViewCart = () => {
      if (this.props.productsInCart.length < 1) {
        return (
          <div style={{ textAlign: 'center' }}>
            <img src={logo} style={{ width: '150px', marginTop: '60px' }} />
            <h5 style={{ marginTop: '16px' }}>Your cart is empty..</h5>
          </div>
        );

      } else {
        return (
          <>
            <div>
              {this.props.productsInCart.map(cartItem => (
                <li
                  className="list-group-item"
                  style={{ paddingLeft: "0", border: "none" }}
                  key={cartItem.productId}
                >
                  <div className="media" style={{ textAlign: "left" }}>
                    <img
                      style={{
                        width: "64px",
                        height: "60px",
                        borderRadius: "8px"
                      }}
                      src={cartItem.image}
                      className="mr-3"
                      alt="..."
                    />

                    <div className="media-body">
                      <h6 className="mt-0 cartName">{cartItem.name}</h6>
                      <span style={{ position: "relative", top: "-6px" }}>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => this.reduceQuantity(cartItem)}
                        >
                          -
                        </button>

                        <button className="btn cartStock">
                          {cartItem.quantity}
                        </button>

                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => this.addQuantity(cartItem)}
                        >
                          +
                        </button>

                        <span
                          id={cartItem.price}
                          style={{ float: "right" }}
                          className="cartPrice"
                        >
                          Rp.{" "}
                          <PriceParsed
                            data={cartItem.price * cartItem.quantity}
                          />
                        </span>
                        <i
                          className="fas fa-trash"
                          style={{
                            position: "relative",
                            left: "90px",
                            cursor: "pointer",
                            color: "grey"
                          }}
                          onClick={() => this.deleteFromCart(cartItem.productId)}>
                        </i>
                      </span>
                    </div>
                  </div>
                  <hr />
                </li>
              ))}
              <button
                data-toggle='modal'
                data-target='#purchase-detail'
                className='btn btn-primary'
                onClick={this.countTotal}
              > Payment
                </button>
            </div>
          </>
        )
      }
    };

    return (
      <Fragment>
        <nav className='navbar sticky-top navbar-expand-lg navbar-light' style={{ background: 'white'}}>
          <h6 className='m-auto pt-2' style={{ height: '40px', fontSize: '17px', fontWeight: 'bold', fontFamily: 'Dosis' }}>Cart
            <span className='badge badge-primary badge-pill ml-1'>{this.props.cart}</span>
          </h6>
        </nav>
        <div style={{ padding: '20px' }}>
          <ViewCart />
        </div>

        <div
          className='modal fade'
          id='purchase-detail'
          role='dialog'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-dialog-scrollable' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalScrollableTitle'>
                  CoffeStreet
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container-fluid">
                  <p>Cashier ID: {this.state.cashier}</p>
                  {this.props.productsInCart.map((product, index) =>
                    (
                      <div className="row" key={index}>
                        <div className="col-md-4">{product.name}</div>
                        <div className="col-md-4">
                          Rp. <PriceParsed data={product.price} />
                        </div>
                        <div className="col-md-2">x{product.quantity}</div>
                      </div>
                    ))}
                  <p className="mt-4">
                    Total : Rp. <PriceParsed data={this.state.tPrice} />
                  </p>
                  <div className="mt-1">
                    Payment: Rp.{" "}
                    <input
                      type="number"
                      style={{
                        border: "none",
                        borderBottom: "1px solid #5bc0de",
                        outline: "none"
                      }}
                      onChange={this.payment}
                      value={this.state.pay}
                    ></input>
                  </div>
                  <div className="mt-2">
                    Change: Rp. <PriceParsed data={this.state.change} />
                  </div>
                  <CheckoutButton />
                </div>
              </div>
            </div>
          </div>
        </div>
        <iframe
          title="receipt"
          id="printing-frame"
          name="print_frame"
          src="about:blank"
          style={{ display: "none" }}
        ></iframe>
      </Fragment>
    )
  }
}


const mapStateToProps = (state) => {
  // console.log(state)
  return {
    cart: state.cart.totalPurchase,
    productsInCart: state.cart.cart
  }
}

export default connect(mapStateToProps)(Cart)
