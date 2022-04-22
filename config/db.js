dbPassword = 'mongodb://sharkup:newproject@sharkup-shard-00-00.fagno.mongodb.net:27017,sharkup-shard-00-01.fagno.mongodb.net:27017,sharkup-shard-00-02.fagno.mongodb.net:27017/test?authSource=admin&replicaSet=atlas-10484z-shard-0&readPreference=primary&ssl=true';
module.exports = {
    mongoURI: dbPassword
};