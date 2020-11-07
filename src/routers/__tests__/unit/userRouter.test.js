import userService from '../../../services/userService';
import {
    getUsers,
    getUsersById,
    getAutoSuggestUsers,
    postUsers,
    putUsersById,
    deleteUsersById,
    postLogin
} from '../../userRouter';
import jwt from 'jsonwebtoken';

jest.mock('../../../services/userService');
jest.mock('jsonwebtoken');

describe('userRouter', () => {
    describe('getUsers', () => {
        it('should put stringified users in response', async done => {
            const mockedUsers = [{
                id: '1',
                login: '2',
                password: '3',
                age: 15,
                is_deleted: false
            }];
            userService.getAllUsers.mockImplementation(() => Promise.resolve(mockedUsers));
            const res = { send: jest.fn() };
            const next = jest.fn();
            await getUsers({}, res, next);
            expect(userService.getAllUsers.mock.calls.length).toBe(1);
            expect(res.send.mock.calls[0][0]).toBe(JSON.stringify(mockedUsers));
            expect(next.mock.calls.length).toBe(0);
            done();
        });

        it('should handle errors', async done => {
            const err = {};
            userService.getAllUsers.mockImplementation(() => Promise.reject(err));
            const next = jest.fn();
            await getUsers({}, {}, next);
            expect(err.customErrorMessage).not.toBeFalsy();
            expect(next.mock.calls.length).toBe(1);
            done();
        });
    });

    describe('getUsersById', () => {
        it('should return response with user found', async done => {
            const mockedUser = { id: 1, login: 2 };
            userService.getUserById.mockImplementation(async id => {
                if (id) {
                    return mockedUser;
                }
                return null;
            });
            const req = { params: { id: 1 } };
            const res = { json: jest.fn() };
            const next = jest.fn();
            await getUsersById(req, res, next);
            expect(userService.getUserById.mock.calls.length).toBe(1);
            expect(userService.getUserById.mock.calls[0][0]).toBe(1);
            expect(res.json.mock.calls.length).toBe(1);
            expect(res.json.mock.calls[0][0]).toBe(mockedUser);
            expect(next.mock.calls.length).toBe(0);
            done();
        });

        it('should send customErrorMessage if no user found', async done => {
            userService.getUserById.mockImplementation(() => null);
            const req = { params: { id: 1 } };
            const res = { json: jest.fn() };
            const next = jest.fn();
            await getUsersById(req, res, next);
            expect(userService.getUserById.mock.calls.length).toBe(1);
            expect(userService.getUserById.mock.calls[0][0]).toBe(1);
            expect(res.json.mock.calls.length).toBe(0);
            expect(next.mock.calls.length).toBe(1);
            expect(next.mock.calls[0][0]).toEqual(expect.objectContaining({
                customErrorMessage: expect.any(String)
            }));
            done();
        });

        it('should handle case when userService throws error', async done => {
            const err = {};
            userService.getUserById.mockImplementation(() => Promise.reject(err));
            const req = { params: {} };
            const res = { json: jest.fn() };
            const next = jest.fn();
            await getUsersById(req, res, next);
            expect(res.json.mock.calls.length).toBe(0);
            expect(err.customErrorMessage).not.toBeFalsy();
            expect(next.mock.calls.length).toBe(1);
            expect(next.mock.calls[0][0]).toEqual(expect.objectContaining({
                customErrorMessage: expect.any(String)
            }));
            done();
        });
    });

    describe('getAutoSuggestUsers', () => {
        it('should put stringified users in response', async done => {
            const mockedUser = { id: 1, login: 2 };
            userService.getAutoSuggestUsers.mockImplementation(() => Promise.resolve(mockedUser));
            const req = { query: {} };
            const res = { json: jest.fn() };
            const next = jest.fn();
            await getAutoSuggestUsers(req, res, next);
            expect(userService.getAutoSuggestUsers.mock.calls.length).toBe(1);
            expect(res.json.mock.calls[0][0]).toBe(mockedUser);
            expect(next.mock.calls.length).toBe(0);
            done();
        });

        it('should handle errors', async done => {
            const err = {};
            userService.getAutoSuggestUsers.mockImplementation(() => Promise.reject(err));
            const req = { query: {} };
            const res = { json: jest.fn() };
            const next = jest.fn();
            await getAutoSuggestUsers(req, res, next);
            expect(err.customErrorMessage).not.toBeFalsy();
            expect(next.mock.calls.length).toBe(1);
            done();
        });
    });

    describe('postUsers', () => {
        it('should responde with 204 when user was created', async done => {
            userService.createUser.mockImplementation(() => Promise.resolve());
            const req = { body: {} };
            const res = { status: jest.fn() };
            const next = jest.fn();
            await postUsers(req, res, next);
            expect(userService.createUser.mock.calls.length).toBe(1);
            expect(res.status.mock.calls[0][0]).toBe(204);
            done();
        });

        it('should handle errors', async done => {
            const err = {};
            userService.createUser.mockImplementation(() => Promise.reject(err));
            const req = { body: {} };
            const res = { status: jest.fn() };
            const next = jest.fn();
            await postUsers(req, res, next);
            expect(next.mock.calls.length).toBe(1);
            expect(next.mock.calls[0][0]).toEqual(expect.objectContaining({
                customErrorMessage: expect.any(String)
            }));
            done();
        });
    });

    describe('putUsersById', () => {
        it('should responde with 204 when user was updated', async done => {
            userService.updateUser.mockImplementation(() => Promise.resolve());
            const req = { params: { id: 1 }, body: {} };
            const res = { status: jest.fn() };
            const next = jest.fn();
            await putUsersById(req, res, next);
            expect(userService.updateUser.mock.calls.length).toBe(1);
            expect(res.status.mock.calls[0][0]).toBe(204);
            done();
        });

        it('should handle errors', async done => {
            const err = {};
            userService.updateUser.mockImplementation(() => Promise.reject(err));
            const req = { params: { id: 1 }, body: {} };
            const res = { status: jest.fn() };
            const next = jest.fn();
            await putUsersById(req, res, next);
            expect(next.mock.calls.length).toBe(1);
            expect(next.mock.calls[0][0]).toEqual(expect.objectContaining({
                customErrorMessage: expect.any(String)
            }));
            done();
        });
    });

    describe('deleteUsersById', () => {
        it('should responde with 200 when user was deleted', async done => {
            userService.deleteUser.mockImplementation(() => Promise.resolve());
            const req = { params: { id: 1 }, body: {} };
            const res = { status: jest.fn() };
            const next = jest.fn();
            await deleteUsersById(req, res, next);
            expect(userService.deleteUser.mock.calls.length).toBe(1);
            expect(res.status.mock.calls[0][0]).toBe(200);
            done();
        });

        it('should handle errors', async done => {
            const err = {};
            userService.deleteUser.mockImplementation(() => Promise.reject(err));
            const req = { params: { id: 1 }, body: {} };
            const res = { status: jest.fn() };
            const next = jest.fn();
            await deleteUsersById(req, res, next);
            expect(next.mock.calls.length).toBe(1);
            expect(next.mock.calls[0][0]).toEqual(expect.objectContaining({
                customErrorMessage: expect.any(String)
            }));
            done();
        });
    });

    describe('postLogin', () => {
        it("should responde with accesstoken if wasn't logged in before", async done => {
            userService.authenticate.mockReturnValue(Promise.resolve({}));
            const accessToken = 42;
            jwt.sign.mockReturnValue(accessToken);
            const req = { body: {} };
            const res = { json: jest.fn(), status: jest.fn() };
            const next = jest.fn();
            await postLogin(req, res, next);
            expect(userService.authenticate.mock.calls.length).toBe(1);
            expect(res.json.mock.calls[0][0]).toBe(accessToken);
            done();
        });

        it("should responde with 403 if user wasn't found", async done => {
            userService.authenticate.mockReturnValue(Promise.resolve());
            const accessToken = 42;
            jwt.sign.mockReturnValue(accessToken);
            const req = { body: {} };
            const res = { json: jest.fn(), status: jest.fn() };
            const next = jest.fn();
            await postLogin(req, res, next);
            expect(userService.authenticate.mock.calls.length).toBe(1);
            expect(jwt.sign.mock.calls.length).toBe(0);
            expect(res.json.mock.calls.length).toBe(0);
            expect(res.status.mock.calls[0][0]).toBe(403);
            done();
        });

        it('should handle errors', async done => {
            userService.authenticate.mockReturnValue(Promise.reject({}));
            const req = { body: {} };
            const res = { json: jest.fn(), status: jest.fn() };
            const next = jest.fn();
            await postLogin(req, res, next);
            expect(next.mock.calls.length).toBe(1);
            expect(next.mock.calls[0][0]).toEqual(expect.objectContaining({
                customErrorMessage: expect.any(String)
            }));
            done();
        });
    });
});
