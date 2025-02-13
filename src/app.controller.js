import { DbConnect } from "../Database/connection.js";
import authRouter from "./modules/auth/auth.controller.js";
import postRouter from "./modules/post/post.controller.js";
import commentRouter from "./modules/comment/comment.controller.js";








export const bootstrap = async (express, app) => {
    DbConnect();
    app.use(express.json())
    app.use('/auth', authRouter)
    app.use('/posts', postRouter)
    app.use('/comments', commentRouter)


}