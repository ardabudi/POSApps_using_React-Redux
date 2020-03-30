import React, { Component } from 'react';
import axios from 'axios';
import './login.css'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.props.history.push('/');
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        // console.log('hahaa');
        axios
            .post("http://localhost:8001/user/login", this.state)
            .then(res => {
                // console.log(res.data);
                localStorage.setItem('token', res.data.result.token);
                localStorage.setItem('user-id', res.data.result.id);
                localStorage.setItem('status', res.data.result.status);
                this.componentDidMount()
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="cardLogin">
                <div className="card-content">
                        <h3>LOGIN</h3>
                        <div className="underline-title"></div>
                        <div className="row justify-content-center">
                            <div className="col-10">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label style={{fontSize: '18px'}} >Email</label>
                                        <input type="text" className="form-control" placeholder="Enter email" value={this.state.name} name="email" onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label style={{fontSize: '18px'}}>Password</label>
                                        <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} name="password" onChange={this.onChange} />
                                    </div>
                                    <button type="submit" className="btn btn-warning btnlgn">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Login;