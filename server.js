const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;

// Connect to mongo
mongo.connect('mongodb://127.0.0.1/mongochat', function (err, db) {
    if (err) {
        throw err;
    }

    console.log('MongoDB connected...');

    // Connect to Socket.io
    client.on('connection', function (socket) {
        let chat = db.collection('chats');

        // Create function to send status
        sendStatus = function (s) {
            socket.emit('status', s);
        }

        // Handle input events
        socket.on('input', function (data) {
            let name = data.name;
            let message = data.message;
       
            // Check for name and message
            if (name == '' || message == '') {
                // Send error status
                sendStatus({status:'Please enter a name and message'});
            } else {
                // Insert message
                chat.insert({ name: name, message: message }, function () {
                    client.emit('output', [data]);

                    // Send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    });
                });
            }
        });
    });
});