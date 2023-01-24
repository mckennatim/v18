"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribe = subscribe;
exports.req = req;
exports.setupSocket = exports.monitorFocus = exports.connect = void 0;

var connect = function connect(client, lsh, cb) {
  // console.log('in connect')
  client.connect({
    onSuccess: function onSuccess() {
      cb(client);
    },
    onFailure: function onFailure(message) {
      console.log("Connection failed: " + message.errorMessage); //dmessage.innerHTML= "Connection failed: " + message.errorMessage;
    },
    useSSL: true,
    userName: lsh.email,
    password: lsh.token
  });
};

exports.connect = connect;

var monitorFocus = function monitorFocus(window, client, lsh, cb) {
  window.onfocus = function () {
    if (!client.isConnected()) {
      // console.log('focused')
      connect(client, lsh, function (client) {
        return cb('focused-connected', client);
      });
    }
  };

  window.onblur = function () {
    // console.log('unfocused')
    if (client.isConnected()) {
      try {
        client.disconnect();
        cb('blur-disconnected', client);
      } catch (err) {
        console.log(err);
      }
    }
  };
};

exports.monitorFocus = monitorFocus;

function req(client, devs, publish, topics) {
  devs.map(function (dev) {
    topics.map(function (top, idx) {
      return publish(client, "".concat(dev, "/req"), "{\"id\":".concat(idx, ",\"req\":\"").concat(top, "\"}"));
    });
  });
}

function subscribe(client, devs, toparr) {
  function subFailure(message) {
    console.log('subscribe failure', message);
  }

  devs.map(function (dev) {
    toparr.map(function (top) {
      return client.subscribe("".concat(dev, "/").concat(top), {
        onFailure: subFailure
      });
    });
  });
}

var setupSocket = function setupSocket(client, devs, publish, topics, cb) {
  var thedevs = Object.keys(devs);
  subscribe(client, thedevs, topics);
  req(client, thedevs, publish, topics);
  cb(devs, client);
};

exports.setupSocket = setupSocket;