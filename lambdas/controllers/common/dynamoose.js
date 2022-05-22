const AWS = require('aws-sdk');
const dynamoose = require("dynamoose");
// let options = {};
// if (process.env.IS_OFFLINE) {
//     options = {
//         region: 'localhost',
//         endpoint: 'http://localhost:8000',
//     };
// }

if (process.env.JEST_WORKER_ID !== undefined) {
    AWS.config.update({region:'us-east-1'});
    process.env.tableName = 's-player-points-dev'
    // dynamoose.aws.ddb.local("http://localhost:8000")
    // console.log('********************** test mode ************************')
  }
  
// console.log(options)
// const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamoose = {
    
    // Dynamoose
    async create(Model, data) {
        try {
            const user = await Model.create(data); // If a user with `id=1` already exists in the table, an error will be thrown.
            return user
        } catch (error) {
            console.error('error', error);
        }

    },
    async get(Model) {
        try {
            const users = await Model.scan().exec();
            // console.log(users);
            return users
        } catch (error) {
            console.error('erroooor', error);
        }

    },
    async getById(Model, id) {
        try {
            const myUser = await Model.get({"ID": id});
            if (myUser == undefined) return { message: 'No Player with the given ID' }
            return myUser
        } catch (error) {
            console.error(error);
        }

    },
    async query(Model, key, value) {
         try {
            const results = await Model
            .scan(key)
            .eq(value)
            .all()
            .exec();
            // console.log(results);
            return results
        } catch (error) {
            console.error(error);
        }

    },

    async deleteOne(Model, ID) {
        try {
            await Model.delete(ID);
            
            return { message: "Delete operation was successful." };
            
        } catch (error) {
            return { error: error };
        }
      },

    async update(Model, instanceObj, ID) {
    instance = await Model.update({ ID: ID }, instanceObj);
    return instance;
    }
};
module.exports = Dynamoose;