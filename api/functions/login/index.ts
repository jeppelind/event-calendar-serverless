import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import bcrypt from 'bcryptjs';
import db from '../lib/mongodb';

const authenticateUser = async (email: string, password: string) => {
    await db.init();
    const user = await db.findUserByEmail(email);
    if (!user) {
        return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return null;
    }
    return user;
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const email = (req.query.email || (req.body && req.body.email));
    const password = (req.query.password || (req.body && req.body.password));
    if (email && password) {
        const user = await authenticateUser(email, password);
        if (user) {
            context.res = {
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: user.token,
                }),
            };
        } else {
            context.res = {
                status: 400,
                body: 'Wrong username or password',
            };
        }
    } else {
        context.res = {
            status: 400,
            body: 'Missing required parameters',
        };
    }
};

export default httpTrigger;