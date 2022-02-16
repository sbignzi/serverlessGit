const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);
    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;
    const User = await Dynamo.getByIdDnm(ID, tableName).catch(err => {
        console.log('error in dynamo get', err);
        return null;
    });
    if (!User) {
        return Responses._400({ message: 'Failed to get user by ID' });
    }

    return Responses._200(User);
};