 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkw5WWJkY2NUa2VaOGJHVVMrR3NlaXRqMjBHNElzb3M3d2JEQStwN3dtWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ2RwVjJNNTBGS0FiTEhnUUl0MnYzZWxWT3F0dWxQSkxiSElhUVY4SldVUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPSndZS3V4Y1Fyc2NVZkMxZTJ6eWVPNjRtcnpDQ3FzS01kWHB2djIxQ0ZnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjYXJRdmo4ZnBkV002a1c1TXJCTHJ1U2pRcllqb0VEQlRNS2tzNUp0VjE4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktFMEw1aHNvSmlORUQvWmxYVVBIRXdJMVN6OUowSkh1NUNVS1JoVS9XR0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhQbXVjNXJCN0tIc2VpM2NmUjkvMXZwMGhOSWlEMFRBYm00MHd0TDRFbDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0FLR2E2NTZEZ0lsMHRxQ1JxdE9pcmtWRm04OExHMVdhTWc3WDRpajRVdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMmFLNU93UlJlOVgvRStjNHFmc3N2dzFPVWlWeng5Q04wWG5iR0pQRndFQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVKQ21DK0VaYkhTRXRJOE9neldsM1dPVmkrWWVzV2RSK211ODNVMzVBdXNueWp1MHlHQjdNaGhjZnZjS3pud2VUclgzcEFUcTR6cGs1VlRzUDlxZkFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI3LCJhZHZTZWNyZXRLZXkiOiJacmhDcmg2NDVOOS9qWkJpS3J2d1Z6Y09qYkQ1SUd4Wk5jVjRRd25lV3dFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJfbEozOW5jY1RobXdFVjlwVnZMaTV3IiwicGhvbmVJZCI6IjFiMGY2Njc5LWZlOTgtNDdiYS04NzRiLTc2MDA4MDc2OTA4YiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYVVoTlFwNlVqcjI4bkl1cEV0WlBQMVJyaW89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS2cwSEFRblZXWDFKWWgvNDJnaFJDWkwwMGZnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjRLSFgzM0FGIiwibWUiOnsiaWQiOiIyMzc2OTk1NjEyOTk6MThAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4bSNyoDclETOo86bRE3Om9CfIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLNzdoL1lGRVBybDFMVUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJpZnFHbllZeHJ1UzRCZEN2M1p5U2xzeFhaeXJ4RUQ5OFIrSzdNV2RENlhVPSIsImFjY291bnRTaWduYXR1cmUiOiJkeVdydGY0d3Z5VGdnbjV1ZkRUZlBDc2crbm00VjAvZ0tFQmtndGhmMHUzVkJWeWhwTkl3dGZDY1poRXFkemVuVU53bDBwdTJJTUFUaEJjVDIxT0REZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoieUgyVGNoMEpmTmprU3NmYzBMSm1aQzNnRWNHWDl4ODdSTHJMRURsMWYzZXhyZkM4ZzR0b1BBVzdZSi9VMW9icy8zZ0FleWVDTGEvNnFZWldtN3lBRHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzc2OTk1NjEyOTk6MThAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWW42aHAyR01hN2t1QVhRcjkyY2twYk1WMmNxOFJBL2ZFZml1ekZuUStsMSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzE1MTExMSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFORkoifQ==',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "TALKDROVE",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "923072380380",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
