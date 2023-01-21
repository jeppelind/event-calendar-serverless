import { GraphQLScalarType } from "graphql";
import { EventModel } from "./types";
import { Resolvers } from "./generated";
import db from '../lib/mongodb';
import { authorize, Roles } from "./permissions";
import { clearEventCache, getEventCache, setEventCache } from "./cache";

const getEventsSlice = (arr: EventModel[], startIdx: number, endIdx: number) => {
    const start = startIdx || 0;
    const end = endIdx || arr.length;
    return arr.slice(start, end);
}

const resolvers: Resolvers = {
    Query: {
        getUpcomingEvents: async (_, { startIndex, endIndex }, context) => {
            const cachedEvents = getEventCache();
            if (cachedEvents.length > 0) {
                return getEventsSlice(cachedEvents, startIndex, endIndex);
            }
            const events = await db.findEvents();
            setEventCache(events);
            return getEventsSlice(events, startIndex, endIndex);
        },
    },
    Mutation: {
        createEvent: async (_, { input }, context) => {
            authorize(context.user, Roles.WRITE);
            clearEventCache();
            const { name, startDate, endDate, description } = input;
            return await db.createEvent(name, startDate, endDate, description);
        },
        deleteEvent: async (_, { id }, context) => {
            authorize(context.user, Roles.WRITE);
            clearEventCache();
            const result = await db.deleteEvent(id);
            return result.deletedCount;
        },
        updateEvent: async (_, { id, input }, context) => {
            authorize(context.user, Roles.WRITE);
            clearEventCache();
            const { name, startDate, endDate, description } = input;
            return await db.updateEvent(id, name, startDate, endDate, description);
        } 
    },
    Event: {
        id: event => event._id
    },
    Date: new GraphQLScalarType({
        name: 'Date',
        parseValue(value: string | number | Date) {
            return new Date(value);
        },
        serialize(value: string | Date) {
            return (typeof value === 'string') ? value : value.toISOString(); // cache returns string
        },
    })
};

export default resolvers;