module.exports = {
  applicationId: process.env.APPLICATION_ID,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL,
  databaseURI: process.env.MONGODB_URI,
  cloud: './cloud/main.js',
  appName: 'digital-desk',
};
