import { EventModel } from "./types";

let cache: EventModel[] = [];

export const getEventCache = () => {
    return cache;
}

export const setEventCache = (events: EventModel[]) => {
    cache = [...events];
}

export const clearEventCache = () => {
    cache = [];
}
  