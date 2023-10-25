const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");

let mongoServer;

async function maybeCreateMongoose() {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
  }
}

module.exports = {
  start: async () => {
    await maybeCreateMongoose();
    return mongoServer;
  },

  stop: async () => {
    if (mongoServer) {
      await mongoServer.stop();
    }
  },

  connect: async () => {
    await maybeCreateMongoose();
    const connection = await mongoose.connect(mongoServer.getUri(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return connection;
  },

  getDbName: () => {
    return mongoServer.instanceInfo;
  },

  disconnect: async (connection) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await connection.disconnect();
  },
};
