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

// When a user joins the guild
bot.on("guildMemberAdd", member => {
  const guild = member.guild
  const channel = guild.channels.get("641114599264878592")

  channel.send("Welcome to the guild! " + member)
})

// When a user leaves the guild
bot.on("guildMemberRemove", member => {
  const guild = member.guild
  const channel = guild.channels.get("641114599264878592")

  channel.send("Thanks for stopping bye! " + member)
})