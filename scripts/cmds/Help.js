const { getPrefix } = global.utils;

module.exports = {
  config: {
    name: "help",
    version: "2.0",
    author: "👑 Samycharles-sama 🌸",
    countDown: 5,
    role: 0,
    shortDescription: {
      fr: "📚 Voir la liste et l'utilisation des commandes"
    },
    category: "📖 Informations",
    guide: { fr: "{pn} [nom_commande]" }
  },

  onStart: async function({ message, args, event, role }) {
    const prefix = await getPrefix(event.threadID);

    // Calcul uptime
    let uptime = process.uptime();
    let days = Math.floor(uptime / 86400);
    let hours = Math.floor((uptime % 86400) / 3600);
    let minutes = Math.floor((uptime % 3600) / 60);
    let seconds = Math.floor(uptime % 60);
    const uptimeText = `${days}j ${hours}h ${minutes}m ${seconds}s`;

    if (!args[0]) {
      // Header bot
      let msg = `╭──⟪ 🤖 sᴀᴍʏ-ᴍᴅ ʙᴏᴛ ᴠ2 ⟫──╮\n`;
      msg += `├ ߷ ᴘʀéғɪxᴇ       : ${prefix}\n`;
      msg += `├ ߷ ᴏᴡɴᴇʀ         : 🌹sᴀᴍʏᴄʜᴀʀʟᴇs\n`;
      msg += `├ ߷ ᴄᴏᴍᴍᴀɴᴅᴇs  : ${global.GoatBot.commands.size}\n`;
      msg += `├ ߷ ᴜᴘᴛɪᴍᴇ        : ${uptimeText}\n`;
      msg += `├ ߷ ᴅᴀᴛᴇ         : ${new Date().toLocaleDateString()}\n`;
      msg += `├ ߷ ʜᴇᴜʀᴇ        : ${new Date().toLocaleTimeString()}\n`;
      msg += `├ ߷ ᴘʟᴀᴛᴇғᴏʀᴍᴇ  : Node.js\n`;
      msg += `├ ߷ ᴅéᴠᴇʟᴏᴘᴘᴇᴜʀ : sᴀᴍʏ\n`;
      msg += `├ ߷ ᴠᴇʀsɪᴏɴ    : ${this.config.version}\n`;
      msg += `╰──────────────────╯\n\n`;

      // Catégories
      const categories = {};
      for (const [name, cmd] of global.GoatBot.commands) {
        if (cmd.config.role > role) continue;
        const cat = cmd.config.category || "Autre";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(name);
      }

      for (const [cat, cmds] of Object.entries(categories)) {
        msg += `╭──⟪ ${cat.toUpperCase()} ⟫──╮\n`;
        for (const cmd of cmds) msg += `├ ߷ ${cmd}\n`;
        msg += `╰──────────────────╯\n\n`;
      }

      msg += `> ©2025 ᴏᴠʟ-ᴍᴅ-ᴠ2 ʙʏ sᴀᴍʏ`;
      await message.reply(msg);
    } else {
      // Info commande spécifique
      const commandName = args[0].toLowerCase();
      const command = global.GoatBot.commands.get(commandName) || global.GoatBot.commands.get(global.GoatBot.aliases.get(commandName));
      if (!command) return await message.reply(`❌ Commande "${commandName}" introuvable.`);
      const cfg = command.config;
      const guide = cfg.guide?.fr?.replace("{pn}", prefix) || "Pas de guide.";
      const desc = cfg.longDescription?.fr || "Pas de description.";

      let msg = `╭──⟪ 🔹 ${cfg.name.toUpperCase()} 🔹 ⟫──╮\n`;
      msg += `├ ߷ Description : ${desc}\n`;
      msg += `├ ߷ Guide       : ${guide}\n`;
      msg += `├ ߷ Version     : ${cfg.version}\n`;
      msg += `├ ߷ Auteur      : ${cfg.author || "Inconnu"}\n`;
      msg += `╰──────────────────╯`;
      await message.reply(msg);
    }
  }
};
