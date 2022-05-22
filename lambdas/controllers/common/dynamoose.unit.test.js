const Dynamoose = require('../common/dynamoose');
const { Player } = require("../../models/player");
const mockingoose = require('mockingoose');
const dynamoose = require("dynamoose");
// var MockAWS = require('mock-aws');

// const sdk = dynamoose.aws.sdk; // require("aws-sdk");
// sdk.config.update({
//     "accessKeyId": "AKID",
//     "secretAccessKey": "SECRET",
//     "region": "us-east-1"
// });
// const ddb = new MockAWS.DynamoDB();
// dynamoose.aws.ddb.set(ddb);
// dynamoose.aws.ddb.local();

// var dynamoose = require('dynamoose');
// dynamoose.aws.ddb.local();
// dynamoose.aws.ddb.local("http://localhost:8000")
// dynamoose.aws.ddb.local("http://localhost:9000");

describe('Responses module tests', () => {

    const ID = Date.now().toString();

    test('dynamoose is an object', () => {
        expect(typeof Dynamoose).toBe('object');
    });

    test('dynamoose has get and create', () => {
        expect(typeof Dynamoose.get).toBe('function');
        expect(typeof Dynamoose.create).toBe('function');
    });

    
    test('dynamoose create data', async () => {
    
    const data = {ID: ID, score: 25, name: 'Chris', game:'uno' };

    expect.assertions(1);
    try {    
        const res = await Dynamoose.create(Player, data);
        expect(res.name).toBe('Chris');
    } catch (error) {
                console.log('error in dynamoose get', error);
            }
        
    });

    test('dynamoose get works', async () => {
        
        expect.assertions(1);
        try {    
            const res = await Dynamoose.get(Player);
            expect(res[0].name).toBe('Chris');
        } catch (error) {
                    console.log('error in dynamoose get', error);
                }
    
        
    });

    test('dynamoose get by id works', async () => {
        
        expect.assertions(1);
        try {    
            const res = await Dynamoose.getById(Player, ID);
            expect(res.name).toBe('Chris');
        } catch (error) {
            console.log('error in dynamoose get', error);
                }
    
        
    });
    test('dynamoose query works', async () => {
        const key = 'ID'
        const value = ID
        expect.assertions(1);
        try {    
            const res = await Dynamoose.query(Player, key, value);
            expect(res[0].name).toBe('Chris');
        } catch (error) {
            console.log('error in dynamoose query', error);
                }
    
        
    });
    test('dynamoose delete works', async () => {

        // expect.assertions(1);
        try {    
            const res = await Dynamoose.deleteOne(Player, ID);
            expect(res.message).toBe('Delete operation was successful.');
        } catch (error) {
            console.log('error in dynamoose delete', error);
                }
    
        
    });


    

});
