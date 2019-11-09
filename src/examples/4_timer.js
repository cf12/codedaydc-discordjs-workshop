// Import discord.js to the project, and make the bot client
const Discord = require("discord.js")
const bot = new Discord.Client()

const pf = "!"

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

bot.on("message", msg => {
  if (msg.author.bot || !msg.content.startsWith(pf))
    return

  const args = msg.content.split(" ")
  const command = args.shift().substring(pf.length).toUpperCase()

  if (command === "REMINDME") {
    msg.reply(`I'll remind you in ${args[0]} seconds!`)

    setTimeout(() => {
      msg.reply(args.slice(1).join(' '))
    }, args[0] * 1000)
  } else {
    msg.channel.send("Sorry, I didn't recognize that command!")
  }
})