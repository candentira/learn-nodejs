import userService from '../../../services/userService';
import request from 'supertest';
import app from '../../../app';
import authenticateMiddleware from '../../../middleware/authenticate/authenticate.js';

jest.mock('../../../services/userService');
jest.mock('../../../middleware/authenticate/authenticate.js');

describe('userRouter', () => {
    it('should fail!', done => {
        const mockedUser = [{ id: '42', login: 'FirstLogin' }];
        userService.getAllUsers.mockReturnValue(Promise.resolve(mockedUser));
        authenticateMiddleware.mockImplementation((req, res, next) => next());
        request(app).get('/users')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.text).toEqual(JSON.stringify(mockedUser));
                return done();
            });
    });
});
