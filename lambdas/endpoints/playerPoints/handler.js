const Responses = require('../../controllers/common/API_Responses');
const Dynamo = require('../../controllers/common/Dynamo');

const tableName = process.env.tableName;


// these methodes use dynamoose 

module.exports.create = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;
    const user = JSON.parse(event.body);
    user.ID = ID;

    const newUser = await Dynamo.create(user, tableName).catch(err => {
        console.log('error in dynamo write', err);
        return null;
    });
    if (!newUser) {
        return Responses._400({ message: 'Failed to write user by ID' });
    }

    return Responses._200({ newUser });
};


module.exports.getById = async event => {
    console.log('event', event);
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;
    const User = await Dynamo.getById(ID, tableName).catch(err => {
        console.log('error in dynamo get', err);
        return null;
    });
    if (!User) {
        return Responses._400({ message: 'Failed to get user by ID' });
    }

    return Responses._200(User);
};



module.exports.get = async event => {
    console.log('event', event);

    const Users = await Dynamo.get(tableName).catch(err => {
        console.log('error in dynamo write', err);
        return null;
    });
    if (!Users) {
        return Responses._400({ message: 'Failed to write user by ID' });
    }

    return Responses._200(Users);
};


module.exports.query = async event => {
    console.log('event', event);
   const queryObject = event.queryStringParameters
   
    if (!event.queryStringParameters) {
        return Responses._400({ message: 'missing query param from the path' });
    }
    var keys = Object.keys(queryObject);
    const key = keys[0]
    const value = queryObject[key]
    const Players = await Dynamo.query(key, value, tableName).catch(err => {
        console.log('error in dynamo get', err);
        return null;
    });
    if (!Players) {
        return Responses._400({ message: 'Failed to get user by ID' });
    }

    return Responses._200(Players);
};