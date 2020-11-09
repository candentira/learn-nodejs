import groupService from '../../../services/groupService';
import {
    getGroups,
    getGroupsById,
    postGroups,
    putGroupsById,
    deleteGroupsById,
    putUsersIntoGroup
} from '../../groupRouter';

jest.mock('../../../services/groupService');

describe('groupRouter', () => {
    describe('getGroups', () => {
        it('should put stringified users in response', async done => {
            const mockedUsers = [{ id: '1', login: '2' }];
            groupService.getAllGroups.mockResolvedValue(mockedUsers);
            const res = { send: jest.fn() };
            const next = jest.fn();
            await getGroups({}, res, next);
            expect(groupService.getAllGroups.mock.calls.length).toBe(1);
            expect(res.send.mock.calls[0][0]).toBe(JSON.stringify(mockedUsers));
            expect(next.mock.calls.length).toBe(0);
            done();
        });

        it('should handle errors', async done => {
            groupService.getAllGroups.mockRejectedValue({});
            const next = jest.fn();
            await getGroups({}, {}, next);
            expect(next.mock.calls[0][0]).toEqual(expect.objectContaining({
                customErrorMessage: expect.any(String)
            }));
            done();
        });
    });

    describe('getGroupsById', () => {
        it('should return response with group found', async done => {
            const mockedUser = { id: 1, login: 2 };
            groupService.getGroupById.mockImplementation(async id => {
                if (id) {
                    return mockedUser;
                }
                return null;
            });
            const req = { params: { id: 1 } };
            const res = { json: jest.fn() };
            const next = jest.fn();
            await getGroupsById(req, res, next);
            expect(groupService.getGroupById.mock.calls.length).toBe(1);
            expect(groupService.getGroupById.mock.calls[0][0]).toBe(1);
            expect(res.json.mock.calls.length).toBe(1);
            expect(res.json.mock.calls[0][0]).toBe(mockedUser);
            expect(next.mock.calls.length).toBe(0);
            done();
        });

        it('should send customErrorMessage if no group found', async done => {
            groupService.getGroupById.mockReturnValue(null);
            const req = { params: { id: 1 } };
            const res = { json: jest.fn() };
            const next = jest.fn();
            await getGroupsById(req, res, next);
            expect(groupService.getGroupById.mock.calls.length).toBe(1);
            expect(groupService.getGroupById.mock.calls[0][0]).toBe(1);
            expect(res.json.mock.calls.length).toBe(0);
            expect(next.mock.calls.length).toBe(1);
            expect(next.mock.calls[0][0]).toEqual(expect.objectContaining({
                customErrorMessage: expect.any(String)
            }));
            done();
        });

        it('should handle case when groupService throws error', async done => {
            groupService.getGroupById.mockRejectedValue({});
            const req = { params: {} };
            const res = { json: jest.fn() };
            const next = jest.fn();
            await getGroupsById(req, res, next);
            expect(res.json.mock.calls.length).toBe(0);
            expect(next.mock.calls.length).toBe(1);
            expect(next.mock.calls[0][0]).toEqual(expect.objectContaining({
                customErrorMessage: expect.any(String)
            }));
            done();
        });
    });

    describe('postGroups', () => {
        it('should responde with 204 when group was created', async done => {
            groupService.createGroup.mockResolvedValue();
            const req = { body: {} };
            const res = { status: jest.fn() };
            const next = jest.fn();
            await postGroups(req, res, next);
            expect(groupService.createGroup.mock.calls.length).toBe(1);
            expect(res.status.mock.calls[0][0]).toBe(204);
            done();
        });

        it('should handle errors', async done => {
            groupService.createGroup.mockRejectedValue({});
            const req = { body: {} };
            const res = { status: jest.fn() };
            const next = jest.fn();
            await postGroups(req, res, next);
            expect(next.mock.calls.length).toBe(1);
            expect(next.mock.calls[0][0]).toEqual(expect.objectContaining({
                customErrorMessage: expect.any(String)
            }));
            done();
        });
    });

    describe('putGroupsById', () => {
        it('should responde with 204 when groupd was updated', async done => {
            groupService.updateGroup.mockResolvedValue();
            const req = { params: { id: 1 }, body: {} };
            const res = { status: jest.fn() };
            const next = jest.fn();
            await putGroupsById(req, res, next);
            expect(groupService.updateGroup.mock.calls.length).toBe(1);
            expect(res.status.mock.calls[0][0]).toBe(204);
            done();
        });

        it('should handle errors', async done => {
            const err = {};
            groupService.updateGroup.mockRejectedValue(err);
            const req = { params: { id: 1 }, body: {} };
            const res = { status: jest.fn() };
            const next = jest.fn();
            await putGroupsById(req, res, next);
            expect(next.mock.calls.length).toBe(1);
            expect(next.mock.calls[0][0]).toEqual(expect.objectContaining({
                customErrorMessage: expect.any(String)
            }));
            done();
        });
    });

    describe('deleteGroupsById', () => {
        it('should responde with 200 when group was deleted', async done => {
            groupService.deleteGroup.mockResolvedValue();
            const req = { params: { id: 1 }, body: {} };
            const res = { status: jest.fn() };
            const next = jest.fn();
            await deleteGroupsById(req, res, next);
            expect(groupService.deleteGroup.mock.calls.length).toBe(1);
            expect(res.status.mock.calls[0][0]).toBe(200);
            done();
        });

        it('should handle errors', async done => {
            groupService.deleteGroup.mockRejectedValue({});
            const req = { params: { id: 1 }, body: {} };
            const res = { status: jest.fn() };
            const next = jest.fn();
            await deleteGroupsById(req, res, next);
            expect(next.mock.calls.length).toBe(1);
            expect(next.mock.calls[0][0]).toEqual(expect.objectContaining({
                customErrorMessage: expect.any(String)
            }));
            done();
        });
    });

    describe('putUsersIntoGroup', () => {
        it('should responde with 204 when user was added into the group', async done => {
            groupService.addUsersToGroup.mockResolvedValue();
            const req = { params: { id: 1 }, body: {} };
            const res = { status: jest.fn() };
            const next = jest.fn();
            await putUsersIntoGroup(req, res, next);
            expect(groupService.addUsersToGroup.mock.calls.length).toBe(1);
            expect(res.status.mock.calls[0][0]).toBe(204);
            done();
        });

        it('should handle errors', async done => {
            const err = {};
            groupService.addUsersToGroup.mockRejectedValue(err);
            const req = { params: { id: 1 }, body: {} };
            const res = { status: jest.fn() };
            const next = jest.fn();
            await putUsersIntoGroup(req, res, next);
            expect(next.mock.calls.length).toBe(1);
            expect(next.mock.calls[0][0]).toEqual(err);
            done();
        });
    });
});
