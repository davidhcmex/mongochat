import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { connect } from "react-redux"
//import { emit } from "./Actions/emitActions"



export class Chat extends Component {

    constructor() {
        super()
        this.state = {
            name: "",
            message: "",
            status: "",
            the_messages: [{ username: "", message: "" }],

        }


        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)



    }


    onChange(e) {

        this.setState(
            {
                name: this["uname"].value,
                message: this["message"].value,



            })
    }

    componentDidMount() {
        var socket = openSocket('http://127.0.0.1:4000');


        //receiving data to be output to local component render
        socket.on('output', (data) => this.display_screen(data));
    }

    display_screen(data) {
        let third_array = []

        third_array = (this.state.the_messages).concat(data)
        this.setState({ the_messages: third_array })
    }

    // handleSubmit (func) {
    //     return event => {
    //       event.preventDefault()
    //       console.log(func)
    //       func(this["uname"].value, this["message"].value)
    //     }
    //   }

    onSubmit(e) {

        e.preventDefault()
        console.log(arguments)
        var socket = openSocket('http://127.0.0.1:4000');

        socket.on("status", (data) => {
            this.setState({ status: data.status })

        })
        // emitting to server and others the incoming message
        //socket.emit("input", { name: this["uname"].value, message: this["message"].value })

       
        
        this.props.onEmit(this["uname"].value, this["message"].value)

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-sm-12">
                        <div id="status">{this.state.status}</div>
                        <form onSubmit={this.onSubmit}>
                           
                            <div className="form-group">
                                <label className="control-label">Username</label>
                                <input value={this.state.name}
                                    ref={node => this["uname"] = node}
                                    type="text"
                                    name="Enter name"
                                    onChange={this.onChange}
                                    className="form-control" />

                            </div>
                            <div id="chat">
                                <div className="form-group">
                                    <label className="control-label">Message</label>
                                    <input value={this.state.message}
                                        type="text" name="Message"
                                        ref={node => this["message"] = node}
                                        onChange={this.onChange}
                                        className="form-control" />

                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-md">
                                        Submit
                                    </button>
                                    <br />
                                </div>
                                <label className="control-label">Messages Flow</label>
                                <div className="card">

                                    <div id="messages" className="card-block" style={{ height: "300px" }}>
                                        {this.state.the_messages.map(function (d, idx) {
                                            return (<p key={idx}>{d.name}{d.message}</p>)
                                        })}
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
               
            </div >

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEmit: (name,message) => dispatch({ type: 'EMIT_INPUT', payload: { name, message} })
    };
};


export default connect(null, mapDispatchToProps)(Chat)