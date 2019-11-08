const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1049701835:AAF66gcdrimObQN1HuPZ99PiWq_uXlQPKic';
const host = '188.113.182.71';
const port = '3128';
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.token, {
	polling: true,
	request: {
		agentClass: Agent,
		agentOptions: {
			socksHost: process.env.host,
			socksPort: parseInt(process.env.port),
			// If authorization is needed:
			// socksUsername: process.env.PROXY_SOCKS5_USERNAME,
			// socksPassword: process.env.PROXY_SOCKS5_PASSWORD
		}
	}
})

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});
