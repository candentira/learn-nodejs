import { initUserRouter } from './userRouter';

export const initBaseRouter = ({ app }) => {
    initUserRouter({ app });
};
