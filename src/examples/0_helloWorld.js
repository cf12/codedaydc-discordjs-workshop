// Import discord.js to the project, and make the bot client
const Discord = require("discord.js")
const bot = new Discord.Client()

// Log in to the bot w/ their token
bot.login("[INSERT TOKEN HERE]")

// Executes actions when the bot is ready
bot.on("ready", () => {
  console.log("[i] Bot is now ready!")

  // Generate invite link
  bot.generateInvite().then(invite => {
    console.log("[i] Invite link: " + invite)
  })
})

// Executes actions when the bot receives a message
bot.on("message", msg => {
  if (msg.author.bot)
    return

  msg.reply("Hello World!")
})