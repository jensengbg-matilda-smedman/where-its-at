/* Display ticket with ID */

function showTicket(ticket) {
    let ticketShow = document.querySelector('#ticketItem');

        let ticketElem = document.createElement('section');
        
        ticketElem.innerHTML +=
            '<article id="ticketArticle">' +
            '<div id="whatWhere"><p>WHAT</p>' + '<h5 class="nameTicket">' + ticket.eventName + '</h5>' + '</div>' +
            '<div id="whatWhere"><p>WHERE</p>' + '<h5 class="whereTicket">' + ticket.city + '</h5>' + '</div>' +
            '<div id="whenTicket">' +
            '<div id="when"><p>WHEN</p>' + '<h5 class="whenTicket">' + ticket.date + '</h5>' + '</div>'  +
            '<div id="from"><p>FROM</p>' + '<h5 class="whenTicket">' + ticket.from + '</h5>' + '</div>' +
            '<div id="to"><p>TO</p>' + '<h5 class="whenTicket">' + ticket.to + '</h5>' + '</div>'+
            '</div>' +
            '<div id="ticketNumber"><img src="img/A2ED7barcode.png" alt="barcode" id="barcode"><p>Ticket number: ' + ticket.id + '</p></div>' +
            '</article>';
        
            ticketShow.append(ticketElem);
}

/* Session storage, ID */

function idStorage() {
   return sessionStorage.getItem('id');
}


/* Fetch ticket from db */
async function getTicket() {
    let id = idStorage();
    const url = `http://localhost:3000/events/getticket/${id}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
        });

        const data = await response.json();
        showTicket(data.id);

    } catch (error) {
        console.log('Error in fetch on getTicket() : ', error);
    }
}

getTicket();