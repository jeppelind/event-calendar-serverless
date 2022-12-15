import { Schema, model, connect, Document } from "mongoose";

let db = null;

interface EventDocument extends Document {
  name: string,
  description?: string,
  startDate: Date,
  endDate?: Date,
}

interface UserDocument extends Document {
    name: string,
    token: string,
    role: number,
    email: string,
    password: string,
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
    email: String,
    password: String,
});

const EventModel = model<EventDocument>('Event', EventSchema);
const UserModel = model<UserDocument>('User', userSchema);

const init = async () => {
    if(!db) {
        db = await connect(process.env.DB_CONNECTION_STRING);
    }
};

//Users
const findUserByToken = async (token: string) => {
    return await UserModel.findOne({ token }).select({ token: 0, password: 0 });
}

const findUserByEmail = async (email: string) => {
    return await UserModel.findOne({ email });
}

// Events
const findEvents = async () => {
    return await EventModel.find().where('endDate').gte(Date.now()).sort({ startDate: 'ascending' });
}

const createEvent = async (name: string, startDate: string, endDate?: string, description?: string) => {
    return await EventModel.create({
        name,
        description,
        startDate: new Date(startDate),
        endDate: (endDate) ? new Date(endDate) : new Date(startDate),
    });
}

const deleteEvent = async (id: string) => {
    return await EventModel.deleteOne({ _id: id });
}

const updateEvent = async (id: string, name: string, startDate: string, endDate?: string, description?: string) => {
    return await EventModel.findByIdAndUpdate(id, {
        name,
        description,
        startDate: new Date(startDate),
        endDate: (endDate) ? new Date(endDate) : new Date(startDate),
    }, {
        new: true,
    });
}

export default {
    init,
    findUserByToken,
    findUserByEmail,
    findEvents,
    createEvent,
    deleteEvent,
    updateEvent,
}
