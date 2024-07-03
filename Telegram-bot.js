const TelegramBot = require('node-telegram-bot-api');
const token = 'YOUR_TELEGRAM_BOT_TOKEN_HERE'; // Replace with your bot token
const bot = new TelegramBot(token, { polling: true });

// List of products
const products = [
  { id: 1, name: 'Amazon Gift Card', price: 25 },
  { id: 2, name: 'Google Play Gift Card', price: 20 },
  { id: 3, name: 'iTunes Gift Card', price: 30 },
];

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to Gift Card Store! Use /products to view available gift cards.");
});

bot.onText(/\/products/, (msg) => {
  let productList = 'Available Gift Cards:\n';
  products.forEach(product => {
    productList += `${product.id}. ${product.name} - $${product.price}\n`;
  });
  bot.sendMessage(msg.chat.id, productList);
});

bot.onText(/\/buy (.+)/, (msg, match) => {
  const productId = parseInt(match[1]);
  const product = products.find(p => p.id === productId);

  if (product) {
    bot.sendMessage(msg.chat.id, `You selected ${product.name}. The price is $${product.price}. Please send your payment details.`);
  } else {
    bot.sendMessage(msg.chat.id, "Invalid product ID. Please use /products to view available products.");
  }
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  // Add more message handling logic if needed
});

console.log('Bot is running...');
