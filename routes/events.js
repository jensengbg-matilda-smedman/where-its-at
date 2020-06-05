const { Router } = require('express');
const router = new Router();
const { showEvent, getEvents, addTicket, getTicket, removeTicket } = require('../models/db');
const { createTicketId } = require('../models/ticketID');

/* Fetch events from db */

router.get('/getall', async (req, res) => {
    let resObj = {
        success: false
    }

    const events = await getEvents();

    if (events) {
        resObj.success = true;
        resObj.events = events;
    }

    res.send(JSON.stringify(resObj));
});

/* Get event from db */

router.post('/showevent', async (req, res) => {
    const body = req.body;
    let ticket = await showEvent(body);

    let resObj = {
        eventid: ticket.eventid,
        eventName: ticket.eventName,
        city: ticket.city,
        date: ticket.date,
        from: ticket.from,
        to: ticket.to,
        price: ticket.price
    }    
    res.send(JSON.stringify(resObj));
});

/* Get ticket from db */

router.get('/getticket/:id', async (req, res) => {
    const id = req.params.id;    
    let ticket = await getTicket(id);

    let resObj = {
        eventid: ticket,
        eventName: ticket,
        city: ticket,
        date: ticket,
        from: ticket,
        to: ticket,
        id: ticket
    }

    res.send(JSON.stringify(resObj));
});

/* Generate ticketID */

router.post('/addticket', async (req, res) => {
    const body = req.body;
    const generic = createTicketId();
    const addticket = await addTicket(body.eventid, generic);

    res.send(JSON.stringify(addticket));
});



router.delete('/deleteticket/:id', async (req, res) => {
    const id = req.params.id;    
    let ticket = await removeTicket(id);

    let resObj = {
        eventid: ticket,
        eventName: ticket,
        city: ticket,
        date: ticket,
        from: ticket,
        to: ticket,
        id: ticket
    }

    res.send(JSON.stringify(resObj));
});

module.exports = router;