const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    const Users = await Dynamo.getAllDnm(tableName).catch(err => {
        console.log('error in dynamo write', err);
        return null;
    });
    if (!Users) {
        return Responses._400({ message: 'Failed to write user by ID' });
    }

    return Responses._200(Users);
};