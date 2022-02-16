const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    // console.log('event', event);
   const queryObject = event.queryStringParameters
   
    if (!event.queryStringParameters) {
        // failed without a query param
        return Responses._400({ message: 'missing query param from the path' });
    }
    var keys = Object.keys(queryObject);
    const key = keys[0]
    const value = queryObject[key]
    const Players = await Dynamo.getItemDnm(key, value, tableName).catch(err => {
        console.log('error in dynamo get', err);
        return null;
    });
    if (!Players) {
        return Responses._400({ message: 'Failed to get user by ID' });
    }

    return Responses._200(Players);
};