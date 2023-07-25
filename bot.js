const TelegramApi = require("node-telegram-bot-api")

const token = "6333961639:AAGg7ClRB50AA7VQaO12Nd90je-KAS3xuTE";

const bot = new TelegramApi(token, {polling: true});

const {gameOptions} = require('./options')

const chats = {} 

bot.on('message', async msg=>{
    const text = msg.text;
    const chatId=msg.chat.id;

    bot.setMyCommands([
        {command: '/start', description: 'Приветствие'},
        {command: '/info', description: 'Должна быть информация'},
        {command: '/game', description: 'miniGAME'}
    ])
    
    if(text === "/start"){
        bot.sendMessage(chatId, `Приветик ${msg.from.first_name} ${msg.from.last_name} ты попал в мою команду альфа теста.`)
    }
    
    if(text === "/info"){
        bot.sendMessage(chatId, 'ВОТ ТЕБЕ И ИНФА, ЕЕ НЕТ XD XD XD')
    }

    if (text === "/game"){
        await bot.sendMessage(chatId, "число загадал от 1 до 9, отгадывай чумба")
        const randomNumber = Math.floor(Math.random() * 10)
        chats[chatId] = randomNumber;
        return bot.sendMessage(chatId, 'я готов чумба', gameOptions)
    }
})
bot.on('callback_query', msg =>{
    const data = msg.data;
    const chatId = msg.message.chat.id;
    bot.sendMessage(chatId, `твой чойз ис ${data} и он никогда не будет правильным, я забил`)
    if(data === chats){
        bot.sendMessage(chatId, `чумба, ты гений! я загадал ${chats}`)
    }else{
        bot.sendMessage(chatId, `:3 ты проебався,  я загадал ${chats[chatId]}`)
    }
})