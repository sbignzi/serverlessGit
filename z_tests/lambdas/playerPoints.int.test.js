const playerPoints = require('../../lambdas/endpoints/playerPoints/handler');
const eventGenerator = require('../testUtils/eventGenerator');
const validators = require('../testUtils/validators');
const { Player } = require("../../lambdas/models/player");

describe('create player score integration tests', () => {
    const ID = Date.now().toString();

    test('it shoudl take a body and return an API Gateway response, status 200 and the body if the palyer is valid', async () => {
        const event = eventGenerator({
            body: {
                score: 25, 
                name: 'Chris', 
                game:'uno'
            },
            pathParametersObject: {
                ID: ID,
            },
        });
        const res = await playerPoints.create(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body).toEqual({
            newUser: {
                score: 25, 
                name: 'Chris', 
                game:'uno',
                ID: ID,
            },
        });
    });

    

    // test('shoudl return a 400 if the ID is not provided', async () => {
    //     const event = eventGenerator({
    //         body: {
    //             score: 25, 
    //             name: 'Chris', 
    //             game:'uno'
    //         },
    //     });
    //     const res = await playerPoints.create(event);

    //     expect(res.statusCode).toBe(400);
       
    // });
    test('shoudl return a 200 if the ID is valid', async () => {
        const event = eventGenerator({
            body: {
                score: 25, 
                name: 'Chris', 
                game:'unooo'
            },
            pathParametersObject: {
                ID: ID,
            },
        });
        const res = await playerPoints.update(event);
        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body).toEqual({
                score: 25, 
                name: 'Chris', 
                game:'unooo',
                ID: ID,
            
        });
    });

    test('shoudl return a 200 if the ID is valid', async () => {
        const event = eventGenerator({
            pathParametersObject: {
                ID: ID,
            },
        });
        const res = await playerPoints.delete(event);
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe(JSON.stringify({message: `player with ID=${ID} has been deleted`}))
       
    });
})