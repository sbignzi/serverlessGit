const dynamoose = require("dynamoose");
const mongoose = require('mongoose');
// process.env.tableName = 's-player-points-dev'
// process.env.region = 'something'
if (process.env.JEST_WORKER_ID !== undefined) {
  var AWS = require('aws-sdk');
  AWS.config.update({region:'us-east-1'});
  process.env.tableName = 's-player-points-dev'
  // dynamoose.aws.ddb.local()
  // dynamoose.aws.ddb.local("http://localhost:8000")
  // dynamoose.local();
}

const tableName = process.env.tableName;
// const tableName = 's-player-points-dev';

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

var Player = dynamoose.model(tableName, PlayerSchema);
// console.log('Player ===============================', typeof Player)
module.exports.Player = Player;