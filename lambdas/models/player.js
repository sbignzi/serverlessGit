const dynamoose = require("dynamoose");
const tableName = process.env.tableName;

const PlayerSchema = new dynamoose.Schema(
  {
    ID: {
      hashKey: true,
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    game: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  }
);

const Player = dynamoose.model(tableName, PlayerSchema);

module.exports.Provider = Player;