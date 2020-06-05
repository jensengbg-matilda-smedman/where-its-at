/* Show ticket */
function showTicket(ticket) {
    let ticketShow = document.querySelector('#showTicket');
    let ticketElem = document.createElement('div');
    ticketElem.classList.add('ticketItem');

    ticketElem.innerHTML +=
        '<h1 class="eventitem">' + ticket.eventName + '</h1>' + 
        '<h3 class="eventitem">' + ticket.date + ' kl ' + ticket.from + '-' + ticket.to + '</h3>' +  
        '<h4 class="eventitem">' + '@ ' + ticket.city + '</h4>' + 
        '<h2 class="eventitem">' + ticket.price + ' sek</h2>';

    ticketShow.append(ticketElem);
    
    addToBy(ticket);
}

function getEvent() {
   return localStorage.getItem('event');
}

/* Session storage */
function storeId(id) {
    sessionStorage.setItem('id', id);
}

/* Fetch the ticket */
async function showEvent() {
    const ticket = await getEvent();
    const url = 'http://localhost:3000/events/showevent';
    
    let obj = {
        eventid: ticket
    }
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers : {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        showTicket(data);

    } catch(error) {
        console.log('Error in fetch on showEvent() :', error);
    }
}


/* Add ticket to db */
async function addTicktet(eventid) {
    const url = 'http://localhost:3000/events/addticket';
    
    let body = {
        eventid: eventid,
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        storeId(data.id);

    } catch(error) {
        console.log('Error in fetch on addTicket() :', error);
    }
}


/* Order and ticketID */
function addToBy(ticket) {
    const orderButton = document.querySelector('#orderButton');
    let item = ticket;
    
    orderButton.addEventListener('click', () => {
        
        let itemvalue = {
            eventid: item.eventid,
            eventName: item.eventName,
            city: item.city,
            date: item.date,
            from: item.from,
            to: item.to,
            id: item.id
        }

        addTicktet(itemvalue);
        location.href = 'http://localhost:3000/ticket.html';
    });
}


showEvent();