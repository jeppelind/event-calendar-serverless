import { GraphQLScalarType } from "graphql";
import { EventModel } from "./types";
import { Resolvers } from "./generated";
import db from '../lib/mongodb';
import { authorize, Roles } from "./permissions";

const getEventsSlice = (arr: EventModel[], startIdx: number, endIdx: number) => {
    const start = startIdx || 0;
    const end = endIdx || arr.length;
    return arr.slice(start, end);
}

const resolvers: Resolvers = {
    Query: {
        getUpcomingEvents: async (_, { startIndex, endIndex }, context) => {
            authorize(context.user, Roles.READ);
            const events = await db.findEvents();
            return getEventsSlice(events, startIndex, endIndex);
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