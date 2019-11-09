// Import .env variables and discord.js
require('dotenv').config()
const Discord = require('discord.js')

// Create client and login using token
const bot = new Discord.Client()
bot.login(process.env.TOKEN)

const pf = "!"
const msgs = [
  "STOP YOU'RE RUINING THE SOUP",
  "NOOOOOOOOOOOOOOOOOOO",
  "WRONG WRONG WRONG",
  "BRO CAN YOU NOT?",
  "DUDE CHILL THIS ISN'T #GENERAL",
  "WHAT ARE YOU DOINGGGGGGGGGG"
]
const choices = [
  "ROCK",
  "PAPER",
  "SCISSORS"
]

// When bot is ready
bot.on('ready', () => {
  console.log('[i] Bot is now ready!')

  bot.generateInvite([ 'MANAGE_MESSAGES', 'MANAGE_ROLES' ])
    .then(link => {
      console.log('[i] Invite link: ' + link)
    })
})

// When bot receives a message
bot.on('message', msg => {
  if (msg.author.bot)
    return

  if (msg.guild.id === '641113927446691860') {
    if (msg.channel.id === '642182281284550689') {
      if (!checkURL(msg.content))
        complain(msg)
    } else if (msg.channel.id === '642557700458151976' && msg.content.startsWith(pf)) {
      const args = msg.content.split(" ")
      const command = args.shift().substring(pf.length).toUpperCase()
      const now = new Date()

      if (command === "PING") {
        msg.channel.send("Pong!")
      } else if (command === "REMINDME") {
        msg.reply(`I'll remind you in ${args[0]} seconds!`)

        setTimeout(() => {
          msg.reply(args.slice(1).join(' '))
        }, args[0] * 1000)
      } else if (command === "RPS") {
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
      } else if (command === "TIME") {
        msg.reply("The time right now is: " + now.toLocaleTimeString())
      } else if (command === "DATE") {
        msg.reply("The date right now is: " + now.toLocaleDateString())
      } else {
        msg.channel.send("Sorry, I didn't recognize that command!")
      }
    }
  }
})

bot.on('guildMemberAdd', member => {
  const botRole = member.guild.roles.get('642217924479811584')
  const userRole = member.guild.roles.get('642184042992893972')

  if (member.user.bot)
    member.addRole(botRole)
  else
    member.addRole(userRole)
})

function complain (msg) {
  msg.delete()
  msg.reply(msgs[Math.floor(Math.random() * msgs.length)])
    .then(msg => {
      msg.delete(5 * 1000)
    })
}

function checkURL (str) {
  const reg = /https:\/\/discordapp.com\/oauth2\/authorize\?client_id=[^\/]+&permissions=0[^\/]+/
  return str.match(reg)
}