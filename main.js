'use strict';
var fs = require('fs');
var path = require('path');
var https = require('https');
var qs = require('querystring');
var Form = require('form-data');
var mime = require('mime-types');

function getHTTPS(url) {
  return new Promise(function(resolve, reject) {
    https.request(url, function(response) {
      var d = '';
      response.setEncoding('utf8');
      response.on('data', function(chunk) {
        d += chunk;
      });

      response.on('end', function() {
        resolve(d);
      });
    }).on('error', function(e) {
      reject(new Error(e));
    }).end();
  });
}

function buildURL(url, params) {
  return url + '?' + qs.stringify(params);
}

function getJSON(url, params) {
  if (params) {
    return getHTTPS(buildURL(url, params)).then(JSON.parse);
  } else {
    return getHTTPS(url).then(JSON.parse);
  }
}

function postJSON(url, params) {
  return post(url, params).then(JSON.parse);
}

function post(url, params) {
  var form = new Form();
  for (var key in params) {
    var d = params[key];
    if (d.hasOwnProperty('value') && d.hasOwnProperty('options')) {
      form.append(key, d.value, d.options);
    } else {
      form.append(key, d);
    }
  }

  return new Promise(function(resolve, reject) {
    form.submit(url, function(err, res) {
      if (err) {
        reject(new Error(err));
      }

      var d = '';
      res.on('data', function(chunk) {
        d += chunk;
      });

      res.on('end', function() {
        resolve(d);
      });
    });
  });
}

function formData(data) {
  if (data.buffer && data.buffer instanceof Buffer) {
    var fileName = path.basename(data.fileName);
    return {
      value: data.buffer,
      options: {
        filename: fileName,
        contentType: mime.lookup(fileName),
      },
    };
  } else if (data.stream && data.stream instanceof stream.Stream) {
    var fileName = path.basename(data.fileName);
    return {
      value: data.stream,
      options: {
        filename: fileName,
        contentType: mime.lookup(fileName),
      },
    };
  } else if (fs.existsSync(data)) {
    var file = path.normalize(data);
    var fileName = path.basename(file);
    return {
      value: fs.createReadStream(file),
      options: {
        filename: fileName,
        contentType: mime.lookup(fileName),
      },
    };
  } else if (!fs.existsSync(data) || data.fileId) {
    return data.fileId || data;
  } else {
    throw new Error('This method only support buffer, file stream, file path and Telegram fileId.');
  }
}

function _perform(url, params) {
  if (url.indexOf('getUpdates') !== -1 || url.indexOf('getMe') !== -1) {
    return getJSON(url, params);
  } else {
    return postJSON(url, params);
  }
}

function Api(token) {
  if (!token) {
    throw new Error('Telegram Bot token not provided!');
  }

  this.token = token;
  this.url = 'https://api.telegram.org/bot' + token + '/';
}

Api.prototype.setKeyboard = function(keyboard, resize, once, selective) {
  if (!Array.isArray(keyboard)) {
    this.keyboard = {
      hide_keyboard: true,
      selective: selective || resize || false,
    };
  } else {
    this.keyboard = {
      keyboard: keyboard,
      resize_keyboard: resize || false,
      one_time_keyboard: once || false,
      selective: selective || false,
    };
  }

  this.keyboard && (this.keyboard = JSON.stringify(this.keyboard));
  return this;
};

Api.prototype.getUpdates = function(offset, limit, timeout) {
  return _perform(this.url + 'getUpdates', {
    offset: offset,
    limit: limit,
    timeout: timeout,
  });
};

Api.prototype.setWebhook = function(url) {
  return _perform(this.url + 'setWebhook', {
    url: url,
  });
};

Api.prototype.getMe = function() {
  return _perform(this.url + 'getMe');
};

Api.prototype.sendMessage = function(chatId, text, options) {
  options || (options = {});
  options.chat_id = chatId;
  options.text = text;
  if (this.keyboard) {
    options.reply_markup = this.keyboard;
    this.keyboard = undefined;
  }

  return _perform(this.url + 'sendMessage', options);
};

Api.prototype.forwardMessage = function(chatId, fromChatId, messageId) {
  return _perform(this.url + 'forwardMessage', {
    chat_id: chatId,
    from_chat_id: fromChatId,
    message_id: messageId,
  });
};

Api.prototype.sendPhoto = function(chatId, data, options) {
  options || (options = {});
  options.chat_id = chatId;
  options.photo = formData(data);
  if (this.keyboard) {
    options.reply_markup = this.keyboard;
    this.keyboard = undefined;
  }

  return _perform(this.url + 'sendPhoto', options);
};

Api.prototype.sendAudio = function(chatId, data, options) {
  options || (options = {});
  options.chat_id = chatId;
  options.audio = formData(data);
  if (this.keyboard) {
    options.reply_markup = this.keyboard;
    this.keyboard = undefined;
  }

  return _perform(this.url + 'sendAudio', options);
};

Api.prototype.sendDocument = function(chatId, data, options) {
  options || (options = {});
  options.chat_id = chatId;
  options.document = formData(data);
  if (this.keyboard) {
    options.reply_markup = this.keyboard;
    this.keyboard = undefined;
  }

  return _perform(this.url + 'sendDocument', options);
};

Api.prototype.sendSticker = function(chatId, data, options) {
  options || (options = {});
  options.chat_id = chatId;
  options.sticker = formData(data);
  if (this.keyboard) {
    options.reply_markup = this.keyboard;
    this.keyboard = undefined;
  }

  return _perform(this.url + 'sendSticker', options);
};

Api.prototype.sendVideo = function(chatId, data, options) {
  options || (options = {});
  options.chat_id = chatId;
  options.video = formData(data);
  if (this.keyboard) {
    options.reply_markup = this.keyboard;
    this.keyboard = undefined;
  }

  return _perform(this.url + 'sendVideo', options);
};

Api.prototype.sendVoice = function(chatId, data, options) {
  options || (options = {});
  options.chat_id = chatId;
  options.audio = formData(data);
  if (this.keyboard) {
    options.reply_markup = this.keyboard;
    this.keyboard = undefined;
  }

  return _perform(this.url + 'sendVoice', options);
};

Api.prototype.sendLocation = function(chatId, lat, lon, options) {
  options || (options = {});
  options.chat_id = chatId;
  options.latitude = lat;
  options.longitude = lon;
  if (this.keyboard) {
    options.reply_markup = this.keyboard;
    this.keyboard = undefined;
  }

  return _perform(this.url + 'sendLocation', options);
};

Api.prototype.sendChatAction = function(chatId, action) {
  return _perform(this.url + 'sendChatAction', {
    chat_id: chatId,
    action: action,
  });
};

Api.prototype.getUserProfilePhotos = function(userId, offset, limit) {
  return _perform(this.url + 'getUserProfilePhotos', {
    user_id: userId,
    offset: offset,
    limit: limit,
  });
};

module.exports = Api;
