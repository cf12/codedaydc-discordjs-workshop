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
  const channel = msg.channel

  if (command === "PING") {
    channel.send(info("Pong!"))
  } else {
    channel.send(error("Command not found!"))
  }
})

function info (msg) {
  return new Discord.RichEmbed()
    .setTitle("INFO")
    .setDescription(msg)
    .setColor("#47d7ff")
    .setFooter(
      `${new Date().toLocaleString("en-US")}`,
      "https://cdn.discordapp.com/avatars/641116288923729934/9fa044a91b84897cc8f4d7ea4e1def5a.webp?size=128"
    )
}

function error (msg) {
  return new Discord.RichEmbed()
    .setTitle("ERROR")
    .setDescription(msg)
    .setColor("#ff6647")
    .setFooter(
      `${new Date().toLocaleString("en-US")}`,
      "https://cdn.discordapp.com/avatars/641116288923729934/9fa044a91b84897cc8f4d7ea4e1def5a.webp?size=128"
    )
}