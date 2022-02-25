const Responses = require('../../controllers/common/API_Responses');
const dynamoose = require('../../controllers/common/dynamoose');

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

    const newUser = await dynamoose.create(user, tableName).catch(err => {
        console.log('error in dynamo write', err);
        return null;
    });
    if (!newUser) {
        return Responses._400({ message: 'Failed to write user by ID' });
    }

    return Responses._200({ newUser });
};

// module.exports.delete = async (event) => {
//     if (!event.pathParameters || !event.pathParameters.ID) {
//       // failed without an ID
//       return Responses._400({ message: "missing the ID from the path" });
//     }
  
//     let id = event.pathParameters.ID;
  
//     const player = await deleteOne(Provider, id);
//     if (!provider) {
//       return Responses._400({ message: "Failed to delete provider by ID" });
//     }
  
//     return Responses._200({ message: `${id} has been deleted` });
//   };

module.exports.getById = async event => {
    console.log('event', event);
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;
    const User = await dynamoose.getById(ID, tableName).catch(err => {
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

    const Users = await dynamoose.get(tableName).catch(err => {
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
    const Players = await dynamoose.query(key, value, tableName).catch(err => {
        console.log('error in dynamo get', err);
        return null;
    });
    if (!Players) {
        return Responses._400({ message: 'Failed to get user by ID' });
    }

    return Responses._200(Players);
};