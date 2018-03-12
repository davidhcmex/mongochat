import openSocket from 'socket.io-client';

var socket = openSocket('http://127.0.0.1:4000');

function save_message(name,message) {
return {
    type:"EMIT_MSG",
    payload: {name,message}
}
}

export function emit(name, message) {
    return (dispatch) => {
        const obj = {name, message}
        socket.emit("input", obj)
        dispatch(save_message(name,message))
    }
    
}

