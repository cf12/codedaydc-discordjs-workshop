// Import .env variables and discord.js
require('dotenv').config()
const Discord = require('discord.js')

// Create client and login using token
const bot = new Discord.Client()
bot.login(process.env.TOKEN)

const msgs = [
  "STOP YOU'RE RUINING THE SOUP",
  "NOOOOOOOOOOOOOOOOOOO",
  "WRONG WRONG WRONG",
  "BRO CAN YOU NOT?",
  "DUDE CHILL THIS ISN'T #GENERAL",
  "WHAT ARE YOU DOINGGGGGGGGGG"
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

  if (msg.guild.id === '641113927446691860' && msg.channel.id === '642182281284550689')
    if (!checkURL(msg.content))
      complain(msg)
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