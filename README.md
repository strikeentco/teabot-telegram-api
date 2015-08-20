teabot-telegram-api
==========

A simple wrapper over Telegram Bot Api with additional features. Developed for [Teabot](https://github.com/strikeentco/teabot).

```sh
npm install teabot-telegram-api
```

```js
var Api = require('teabot-telegram-api');

var token = 'YOUR_TELEGRAM_BOT_TOKEN';

var botApi = new Api(token);
botApi.setWebhook('https://example.com/bot');
botApi.getMe().then(function(response) {
  console.log('getMe:', response);
});

var inputFile = {
  stream: fs.createReadStream('file.png'),
  fileName: 'file.png'
};
botApi.sendPhoto('chatId', inputFile, {caption: 'file.png'}).then(function(response) {
  console.log('sendPhoto:', response);
});
```

# [Methods](https://core.telegram.org/bots/api)

All methods return a `Promise`, unless otherwise indicated.

## [getMe()](https://core.telegram.org/bots/api#getme)

A simple method for testing your bot's auth token. Returns basic information about the bot in form of a User object.

## [setWebHook(url)](https://core.telegram.org/bots/api#setwebhook)

Specify an url to receive incoming updates via an outgoing webhook.

### Params:

* **url** (*String*) - HTTPS url to send updates to. Use an empty string to remove webhook integration.

## [getUpdates([timeout], [limit], [offset])](https://core.telegram.org/bots/api#getupdates)

Use this method to receive incoming updates using long polling.

### Params:

* **timeout** (*Integer*) - Timeout in seconds for long polling.
* **limit** (*Integer*) - Limits the number of updates to be retrieved.
* **offset** (*Integer*) - Identifier of the first update to be returned.

## [sendMessage(chatId, text, [options])](https://core.telegram.org/bots/api#sendmessage)

Send text message.

### Params:

* **chatId** (*Integer*) - Unique identifier for the message recipient.
* **text** (*String*) - Text of the message to be sent.
* **[options]** (*Object*) - Message options:
  * **disable_web_page_preview** (*Boolean*) - Disables link previews for links in this message.
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.

## [forwardMessage(chatId, fromChatId, messageId)](https://core.telegram.org/bots/api#forwardmessage)

Forward messages of any kind.

### Params:

* **chatId** (*Integer*) - Unique identifier for the message recipient.
* **fromChatId** (*Integer*) - Unique identifier for the chat where the original message was sent.
* **messageId** (*Integer*) - Unique message identifier.

## [sendPhoto(chatId, photo, [options])](https://core.telegram.org/bots/api#sendphoto)

Send photo.

### Params:

* **chatId** (*Integer*) - Unique identifier for the message recipient.
* **photo** (*String|Object*) - Object with file path, Stream, Buffer or `file_id`. See [InputFile object](#inputfile-object) for more info.
* **[options]** (*Object*) - Photo options:
  * **caption** (*String*) - Photo caption.
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.


## [sendAudio(chatId, audio, [options])](https://core.telegram.org/bots/api#sendaudio)

Send audio.

### Params:

* **chatId** (*Integer*) - Unique identifier for the message recipient.
* **audio** (*String|Object*) - Object with file path, Stream, Buffer or `file_id`. See [InputFile object](#inputfile-object) for more info.
* **[options]** (*Object*) - Audio options:
  * **duration** (*Integer*) - Duration of sent audio in seconds.
  * **performer** (*String*) - Performer of sent audio.
  * **title** (*String*) - Title of sent audio.
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.


## [sendDocument(chatId, document, [options])](https://core.telegram.org/bots/api#sendDocument)

Send document.

### Params:

* **chatId** (*Integer*) - Unique identifier for the message recipient.
* **document** (*String|Object*) - Object with file path, Stream, Buffer or `file_id`. See [InputFile object](#inputfile-object) for more info.
* **[options]** (*Object*) - Document options:
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.


## [sendSticker(chatId, sticker, [options])](https://core.telegram.org/bots/api#sendsticker)

Send .webp stickers.

### Params:

* **chatId** (*Integer*) - Unique identifier for the message recipient.
* **sticker** (*String|Object*) - Object with file path, Stream, Buffer or `file_id`. See [InputFile object](#inputfile-object) for more info.
* **[options]** (*Object*) - Sticker options:
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.


## [sendVideo(chatId, video, [options])](https://core.telegram.org/bots/api#sendvideo)

Send video.

### Params:

* **chatId** (*Integer*) - Unique identifier for the message recipient.
* **video** (*String|Object*) - Object with file path, Stream, Buffer or `file_id`. See [InputFile object](#inputfile-object) for more info.
* **[options]** (*Object*) - Video options:
  * **duration** (*Integer*) - Duration of sent video in seconds.
  * **caption** (*String*) - Video caption.
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.


## [sendVoice(chatId, audio, [options])](https://core.telegram.org/bots/api#sendvoice)

Send voice.

### Params:

* **chatId** (*Integer*) - Unique identifier for the message recipient.
* **audio** (*String|Object*) - Object with file path, Stream, Buffer or `file_id`. See [InputFile object](#inputfile-object) for more info.
* **[options]** (*Object*) - Voice options:
  * **duration** (*Integer*) - Duration of sent video in seconds.
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.

## [sendLocation(chatId, latitude, longitude, [options])](https://core.telegram.org/bots/api#sendlocation)

Send location.

### Params:

* **chatId** (*Integer*) - Unique identifier for the message recipient.
* **latitude** (*Float*) - Latitude of location.
* **longitude** (*Float*) - Longitude of location.
* **[options]** (*Object*) - Location options:
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.

## [sendChatAction(chatId, action)](https://core.telegram.org/bots/api#sendchataction)

Send chat action.

`typing` for text messages, `upload_photo` for photos, `record_video` or `upload_video` for videos, `record_audio` or `upload_audio` for audio files, `upload_document` for general files, `find_location` for location data.

### Params:

* **chatId** (*Integer*) - Unique identifier for the message recipient.
* **action** (*String*) - Type of action to broadcast.


## [getUserProfilePhotos(userId, [offset], [limit])](https://core.telegram.org/bots/api#getuserprofilephotos)

Use this method to get a list of profile pictures for a user.

### Params:

* **userId** (*Integer*) - Unique identifier of the target user.
* **[offset]** (*Integer*) - Sequential number of the first photo to be returned. By default, all photos are returned.
* **[limit]** (*Integer*) - Limits the number of photos to be retrieved. Values between 1—100 are accepted. Defaults to 100.

# Extra

## setKeyboard(keyboard, [resize], [once], [selective])

Custom keyboard.

### Params:

* **keyboard** (*Array of Array of Strings*) - Array of button rows, each represented by an Array of Strings.
* **[resize]** (*Boolean*) - Requests clients to resize the keyboard vertically for optimal fit.
* **[once]** (*Boolean*) - Requests clients to hide the keyboard as soon as it's been used.
* **[selective]** (*Boolean*) - Use this parameter if you want to show the keyboard to specific users only.

**Note:** This method is chainable.

## setKeyboard([hide_keyboard], [selective])

If you just want to hide the keyboard, then do this:
```js
botApi.setKeyboard().sendMessage('chatId', 'Text');
//or
botApi.setKeyboard(true);
botApi.sendMessage('chatId', 'Text');
```
If you want to hide the keyboard to specific users only, then do this:
```js
botApi.setKeyboard(true, true).sendMessage('chatId', 'Text');
//or
botApi.setKeyboard(true, true);
botApi.sendMessage('chatId', 'Text');
```

### Params:

* **[hide_keyboard]** (*True*)- Requests clients to hide the custom keyboard.
* **[selective]** (*Boolean*) - Use this parameter if you want to show the keyboard to specific users only.

**Note:** This method is chainable.

## InputFile object

If buffer:
```js
var inputFile = {
  buffer: new Buffer(),
  fileName: 'file.png'
};
```
If stream:
```js
var inputFile = {
  stream: fs.createReadStream('file.png'),
  fileName: 'file.png'
};
```
If path:
```js
var inputFile = 'file.png';
```
If `file_id`:
```js
var inputFile = 'file_id';
//or
var inputFile = {fileId: 'file_id'};
```

## License

The MIT License (MIT)<br/>
Copyright (c) 2015 Alexey Bystrov
