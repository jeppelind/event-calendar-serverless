import { Schema, model, connect, Document } from "mongoose";

let db = null;

interface EventDocument extends Document {
  name: string,
  description?: string,
  startDate: Date,
  endDate?: Date,
  errors: any,
}

interface UserDocument extends Document {
    name: string,
    token: string,
    role: number,
}

const EventSchema = new Schema({
    name: String,
    description: String,
    startDate: Date,
    endDate: Date,
});

const userSchema = new Schema({
    name: String,
    token: String,
    role: Number,
});

const EventModel = model<EventDocument>('Event', EventSchema);
const UserModel = model<UserDocument>('User', userSchema);

const init = async () => {
    if(!db) {
        db = await connect(process.env.DB_CONNECTION_STRING);
    }
};

// Events
const findEvents = async () => {
    return await EventModel.find().where('endDate').gte(Date.now()).sort({ startDate: 'ascending' });
}

//Users
const findUserByToken = async (token: string) => {
    return await UserModel.findOne({ token }).select({ token: 0, password: 0 });
}

export default {
    init,
    findEvents,
    findUserByToken,
}
