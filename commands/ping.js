module.exports.run = (client, message, args) => {
  // Excluir o comando executado pelo usuario.
  message.delete({ timeout: 1000 });

  message.channel.send(`:point_right: Ping: **${parseInt(client.ws.ping)}**ms`);
};
