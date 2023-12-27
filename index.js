const axios = require('axios');
const { Telegraf } = require('telegraf');

const bot = new Telegraf('6702926495:AAFLzGi7JK-B5o4o4cHrgeRPNT1RXiKUwSE');

let targetLanguage = 'uz';

bot.command('setlang', (ctx) => {
  const newTargetLanguage = ctx.message.text.split(' ')[1];
  if (newTargetLanguage) {
    targetLanguage = newTargetLanguage;
    ctx.reply(`Target language set to: ${targetLanguage}`);
  } else {
    ctx.reply('Please provide a valid language code.');
  }
});

bot.on('text', async (ctx) => {
  const text = ctx.message.text;
  const sourceLanguage = 'en';

  try {
    const translation = await translateText(text, sourceLanguage, targetLanguage);
    ctx.reply(`${translation}`);
  } catch (error) {
    console.error(error);
    ctx.reply('Translation failed.');
  }
});

async function translateText(text, sourceLanguage, targetLanguage) {
  const encodedParams = new URLSearchParams();
  encodedParams.set('from', sourceLanguage);
  encodedParams.set('to', targetLanguage);
  encodedParams.set('text', text);

  const options = {
    method: 'POST',
    url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '25415b622emshc4c6c96d8990326p111fb7jsn0ea4a69a9112',
      'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com',
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);

    if (response.data && response.data.trans) {
      return response.data.trans;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
//just
bot.launch();

