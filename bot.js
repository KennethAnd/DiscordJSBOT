// Load up the discord.js library
const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');
const config = require("./config.json");
//
//
// 
const client = new Discord.Client({disableEveryone: false});

client.on("ready", () => {
  console.log(`Bot is online, logged into ${client.user.tag}`); 
});

var num1 = 0, num2 = 0;
var idReact, startReact = false;
var statusName = "", statusType = "WATCHING";
var embed = false, tracking = false;
var serverTracking;
var unicodeReact = '';
var channelTID;
var userTagged;
var encryptProtection = false;
client.on("message", async msg => {
  if(msg.guild.id != null){
          if(msg.content.startsWith("embed") && msg.author.tag == client.user.tag){
              embed = !embed;
              if(embed == true){
              msg.channel.send("enabled embed messages");
            }
            else{
              msg.channel.send("disabled embed messages");
            }
          }
  if(msg.content.startsWith("setCustom ")){
    var str = msg.content;
    str = str.substring(11, 12);
    unicodeReact = str;
    console.log("set custom react to " + unicodeReact);
  }
          if(msg.content.startsWith("startSession ") && msg.author.tag == client.user.tag){
            var str = msg.content;
            serverTracking = str.substring(13);
            tracking = !tracking;
            if(tracking == false){
            console.log("No longer logging words in server with ID " + serverTracking);
            }
            else{
            console.log("Now logging all words in server with ID " + serverTracking);
          }
        }
          if(msg.content.startsWith("convertBin ") && msg.author.tag == client.user.tag){
            var str = msg.content;
            var input = str.substring(11);
            var output = "";
              for (var i = 0; i < input.length; i++) {
                  var chrToBin = input.charCodeAt(i);
                  output += chrToBin.toString(2) + " ";
              }
            console.log(output);
            msg.delete();
          }
          if(msg.content.startsWith("reactSpam ") && msg.author.tag == client.user.tag){
            var str = msg.content;
            idReact = str.substring(10);
            if(idReact == null){
              idReact = msg.guild.id;
            }
            startReact = !startReact;
            if(startReact == true){
            msg.channel.send("Now react spamming server with the ID \'" + idReact + "\'");
          }
          else{
            msg.channel.send("No longer react spamming server with the ID \'" + idReact + "\'");
          }
        }
          if(msg.content.startsWith("setName ") && msg.author.tag == client.user.tag){
            var str = msg.content;
            statusName = str.substring(8);
            msg.channel.send("Set status content to \'" + statusName + "\', don't forget to \'status\', man");
          }
          if(msg.content.startsWith("setType ") && msg.author.tag == client.user.tag){
            var str = msg.content;
            statusType = str.substring(8);
            msg.channel.send("Set status type to \'" + statusType + "\', don't forget to \'status\'");
          }
          if(msg.content == "status" && msg.author.tag == client.user.tag){
            client.user.setPresence({
              status: "online",
              game: {
                name: statusName,
                type: statusType
              }
            });
            msg.channel.send("set status content as: \'" + statusName + "\', and status type as: \'" + statusType + "\'.");
          }
          if(msg.content.startsWith("getAv ") && msg.author.tag == client.user.tag){
            var member = msg.mentions.users.first();
                let embed = new Discord.RichEmbed()
              .setTitle(msg.mentions.users.first())
              .setImage(member.avatarURL)
              .setColor('Random');
                msg.channel.send(embed);
          }
          var stopSpam = 0;
          if(msg.content.startsWith("stickyGrenade ") && msg.author.tag == client.user.tag){
            var member = msg.mentions.users.first();
            userTagged = member;
                msg.channel.send("Threw a sticky grenade! it hit " + member);
           }
          if(msg.content == "chatSlaughter" && msg.author.tag == client.user.tag){
              for(var i = 0; i < 999; i++){
                var strI;
                var Ni;
                for(Ni = 0; Ni < 500; Ni++){
                    strI += "﷽";
                }
                msg.channel.send(strI).then(msg => {msg.delete(500);});
                strI = "";
              }
           }
          if(msg.content.startsWith("stopSpam ") && msg.author.tag == client.user.tag){
            stopSpam += 1;
            msg.delete();
           }
           if (msg.content.startsWith("slowPing ")) {
              var member = msg.mentions.users.first();
                var Ni;
                var strI = "";
              for(var i = 0; i < 999; i++){
                for(Ni = i; Ni > 0; Ni--){
                    strI += "﷽";
                }
                msg.channel.send(member + " joe " + strI).then(msg => {msg.delete(1325);});
                if(stopSpam == 1){
                  break;
                }
              }
              stopSpam = 0;
          }
          if(msg.content.startsWith("setEncrypt") && msg.author.tag == client.user.tag){
            encryptProtection = !encryptProtection;
            console.log("encryption protection is now " + encryptProtection);
            msg.delete();
          }
  if(msg.content.startsWith("setOutputChannel ")){
  channelTID = msg.content.substring(17);
  console.log("Channel output set to: " + channelTID);
}
  if(msg.content.startsWith("uinfo ")){
    var user = msg.mentions.users.first();
    let uinfoEmbed = new Discord.RichEmbed()
    .setTitle(msg.mentions.users.first())
    .setColor('RANDOM')
    .setDescription("Account created: " + user.createdAt() + "\nCurrent presence: " + user.presence + "\nTag: " + user.tag + "\nUsername: " + user.username + "\nID: " + user.id + "\nLast message: " + user.lastMessage())
    .setTimeStamp();
    msg.channel.send(uinfoEmbed);
  }
        if(startReact == true){
    if(unicodeReact != null){
                if(userTagged != null && msg.user == userTagged){
                msg.react(unicodeReact); 
                }
                else if(userTagged != null){

                }
                else{
                msg.react(unicodeReact); 
                }
    }
    else{
      console.log("unicode is undefined");
    }
        }
  if(msg.content.startsWith("help")){
      const embed = new Discord.RichEmbed()
      .setTitle("help")
      .setColor('RANDOM')
      .addField("uinfo @user", "get info on a user")
      .addField("getAv @user", "get someone's avatar")
      .addField("embed", "enables/disabled embed messages")
      .addField("setName", "set content of status to be set")
      .addField("setType", "set type of status to be set('WATCHING, PLAYING, LISTENING')")
      .addField("status", "use info instantiated to set your custom status")
      .addField("setOutputChannel", "sets output channel for message tracking")
      .addField("reactSpam (serverID)", "starts react spamming every message on a certain server")
      .addField("startSession (serverID)", "starts logging all messages in a certain server")
      .addField("setCustom (unicodeEmoji)", "sets unicode emoji to spam")
      .addField("convertBin (text)", "converts text to binary")
      .addField("setEncrypt", "enables/disables encryption protection")
      .addField("stickyGrenade", "(EXPERIMENTAL) Will have use to a tagged user :)")
      .addField("slowPing", "(EXPERIMENTAL) Being cancerous whilst pinging someone.")
      .addField("chatSlaughter", "(EXPERIMENTAL) Makes chat complete cancer.")
      .addField("help", "displays this command");
      msg.channel.send(embed);
  }
      else{}
      if(msg.guild.id == serverTracking && tracking == true){
        var content = msg.content;
        if(encryptProtection == false){
        client.channels.get('' + channelTID).send(msg.author.tag + " said in " + msg.channel + ": " + content);
      }
        else{
          var user = "" + msg.author.tag;
          var output = "";
          var user2 = "";
          var content2 = "";
          var chnl = "" + msg.channel.toString();
          var channel2;
              for (var i = 0; i < user.length; i++) {
                  var chrToBin = user.charCodeAt(i);
                  user2 += chrToBin.toString(2) + " ";
              }
              for (var i = 0; i < content.length; i++) {
                  var chrToBin = content.charCodeAt(i);
                  content2 += chrToBin.toString(2) + " ";
              }
              for (var i = 0; i < chnl.length; i++) {
                  var chrToBin = chnl.charCodeAt(i);
                  channel2 += chrToBin.toString(2) + " ";
              }
          client.channels.get('' + channelTID).send(user2 + "00100000 01110011 01100001 01101001 01100100 00100000 01101001 01101110 00100000 " + channel2 + ": " + content2);
        }
      }
      if(msg.author.tag == client.user.tag && embed == true && msg.cleanContent != null){
        var content = msg.content;
        var isEmbed = false;
    msg.embeds.forEach((embed) => {
      isEmbed = true;
    });
    if(isEmbed == false){
        msg.delete();
        const embed = new RichEmbed()
      .setColor('RANDOM')
      .setDescription(content);
    msg.channel.send(embed);
  }
      }
    }
    else{
      
    }
});

client.login(config.token);