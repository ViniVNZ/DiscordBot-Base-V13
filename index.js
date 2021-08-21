require("dotenv").config();

if (process.version.slice(1).split(".")[0] < 16)
  throw new Error(
    "Node 8.0.0 or higher is required. Update Node on your system."
  );

  const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  allowedMentions: { parse: ["users", "roles"], repliedUser: true },
});

// Evento ready, Status do bot, etc.

client.on("ready", () => {
  client.user.setActivity("Status do seu bot");

  console.log(
    `o Bot foi iniciado completamente com ${client.users.cache.size} usuarios em ${client.guilds.cache.size} servidor(es)`
  );
});

// Sistema de comandos

client.on("message", (message) => {
  if (message.channel.type == "dm") return;
  if (message.author.bot) return;
  if (!message.content.startsWith(process.env.PREFIX)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(process.env.PREFIX.length);

  let args = message.content.split(" ").slice(1);

  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    if (err.code == "MODULE_NOT_FOUND") return;
    console.error(err);
  }
});

client.login(process.env.TOKEN);
