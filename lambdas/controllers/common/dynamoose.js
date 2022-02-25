const AWS = require('aws-sdk');
const dynamoose = require("dynamoose");
let options = {};
if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };
}
console.log(options)
const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamoose = {

    async create(Model, data) {
        // const Model = dynamoose.model(TableName, {"ID": String, "game": String, "name": String, "score": Number});
        try {
            const user = await Model.create(data); // If a user with `id=1` already exists in the table, an error will be thrown.
            console.log(user);
            return user
        } catch (error) {
            console.error('error', error);
        }

    },
    async get(Model) {
        // const Model = dynamoose.model(TableName, {"ID": String, "game": String, "name": String, "score": Number});
        try {
            const users = await Model.scan().exec();
            console.log(users);
            return users
        } catch (error) {
            console.error('erroooor', error);
        }

    },
    async getById(Model, id) {
        // const Model = dynamoose.model(TableName, {"ID": String, "game": String, "name": String, "score": Number});
        try {
            const myUser = await Model.get({"ID": id});
            console.log(myUser);
            return myUser
        } catch (error) {
            console.error(error);
        }

    },
    async query(Model, key, value) {
        // const Data = dynamoose.model(TableName, {"ID": String, "game": String, "name": String, "score": Number});
        // const Model = dynamoose.model(TableName, {"ID": String, "game": String, "name": String, "score": Number});
       
        // const tableSchema = {"ID": String, "game": String, "name": String, "score": Number}
        try {
            // const results = Data.query(key).contains(value).exec();
            // const results = await dynamoose
            const results = await Model
            // .model(TableName, tableSchema)
            .scan(key)
            .contains(value)
            .all()
            .exec();
            console.log(results);
            return results
        } catch (error) {
            console.error(error);
        }

    },

    // async write(data, TableName) {
    //     if (!data.ID) {
    //         throw Error('no ID on the data');
    //     }

    //     const params = {
    //         TableName,
    //         Item: data,
    //     };

    //     const res = await documentClient.put(params).promise();

    //     if (!res) {
    //         throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`);
    //     }

    //     return data;
    // },

    // update: async ({ tableName, primaryKey, primaryKeyValue, updateKey, updateValue }) => {
    //     const params = {
    //         TableName: tableName,
    //         Key: { [primaryKey]: primaryKeyValue },
    //         UpdateExpression: `set ${updateKey} = :updateValue`,
    //         ExpressionAttributeValues: {
    //             ':updateValue': updateValue,
    //         },
    //     };

    //     return documentClient.update(params).promise();
    // },

    // query: async ({ tableName, index, queryKey, queryValue }) => {
    //     const params = {
    //         TableName: tableName,
    //         IndexName: index,
    //         KeyConditionExpression: `${queryKey} = :hkey`,
    //         ExpressionAttributeValues: {
    //             ':hkey': queryValue,
    //         },
    //     };

    //     const res = await documentClient.query(params).promise();

    //     return res.Items || [];
    // },
};
module.exports = Dynamoose;