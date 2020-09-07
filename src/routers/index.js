import userRouter from './userRouter';

class BaseRouter {
    init({ app }) {
        userRouter.init({ app });
    }
}

export default new BaseRouter();
