// Import discord.js to the project, and make the bot client
const Discord = require("discord.js")
const bot = new Discord.Client()

const pf = "!"
const choices = [
  "ROCK",
  "PAPER",
  "SCISSORS"
]

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

  if (command === "RPS") {
    const userChoice = args[0].toUpperCase()
    const botChoice = choices[Math.floor(Math.random() * choices.length)]

    msg.channel.send(`You picked: ${userChoice}\nI picked: ${botChoice}`)

    if (userChoice === botChoice) {
      msg.reply("It's a draw!")
    } else if (userChoice === "ROCK") {
      if (botChoice === "PAPER")
        msg.reply("I win!")
      else if (botChoice === "SCISSORS")
        msg.reply("You win!")
    } else if (userChoice === "PAPER") {
      if (botChoice === "SCISSORS")
        msg.reply("I win!")
      else if (botChoice === "ROCK")
        msg.reply("You win!")
    } else {
      if (botChoice === "ROCK")
        msg.reply("I win!")
      else if (botChoice === "PAPER")
        msg.reply("You win!")
    }
  } else {
    msg.channel.send("Sorry, I didn't recognize that command!")
  }
})