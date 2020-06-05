const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { v4: uuidv4 } = require('uuid');
const adapter1 = new FileSync('users.json');
const users = low(adapter1);
const adapter2 = new FileSync('events.json');
const events = low(adapter2);

module.exports = {

    /* Find users */

    async getUserById(user) {
        return await users.get('users').find({ uuid: user.uuid }).value();
    },

    async getUserName(user) {
        return await users.get('users').find({ username: user.username }).value();
    },

    /* Find and add events */

    async showEvent(uuid) {
        return await events.get('events').find({ eventid: uuid.eventid }).value();
    },

    async getEvents() {
        return await events.get('events').value();
    },

    async addEvents({eventName, city, date, from, to, tickets, price}) {
        const uuid = uuidv4();
        return await events.get('events').push({ eventid: uuid, eventName: eventName, city: city, date: date, from: from, to: to, tickets: tickets, price: price }).write();
    },

    /* Find, add and remove tickets */

    async getTicket(id) {
        return await events.get('tickets').find({ id: id }).value();
    },

    async addTicket(ticket, id) {
        let newTicket = ticket; 
        newTicket.id = id;

        await events.get('tickets').push(newTicket).write();
        return newTicket;
    },

    async removeTicket(id) {
        return await events.get('tickets').remove({ id: id }).write();
    }
}