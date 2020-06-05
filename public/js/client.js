/* Fetch events from db */
async function getAllEvents() {
    const url = 'http://localhost:3000/events/getall';

    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        const data = await response.json();
        showAllEvents(data.events);

    } catch (error) {
        console.log('Error in fetch on getAllEvents: ', error);
    }
}

/* Show events */

function showAllEvents(allEvents) {
    let eventSection = document.querySelector('#eventSection');
    eventSection.innerHTML = '';

    for (let event of allEvents) {
        let eventElem = document.createElement('div');
        eventElem.classList.add('eventlist');
        
        eventElem.innerHTML +=
            '<h3 id="eventlistDate" class="eventitem" name="eventitem" value=' + event.eventid + '>' + event.date + '</h3>' +
            '<section>' +
            '<div id="eventlistInfo">' +
                '<h2 id="eventlistName" class="eventitem" name="eventitem" value=' + event.eventid + '>' + event.eventName + '</h2>' + 
                '<h5 id="eventlistWhere" class="eventitem" name="eventitem" value=' + event.eventid + '>' + event.city + '</h5>' + 
                '<h4 id="eventlistTime" class="eventitem" name="eventitem" value=' + event.eventid + '>' + event.from + '-' + event.to + '</h4>' + 
            '</div>' +
            '<h4 id="eventlistPrice" class="eventitem" name="eventitem" value=' + event.eventid + '>' + event.price + '</h4>' +
            '</section>';

        eventSection.append(eventElem);
    }
    addEvent(); 
}

function saveEvent(eventItem) {
    return localStorage.setItem('event', eventItem);
}

/* Click on event */
function addEvent() {
    const events = document.querySelectorAll('.eventitem');

    for (let i = 0; i < events.length; i++) {
        events[i].addEventListener('click',  () => {
            let eventid = events[i].getAttribute('value');
            saveEvent(eventid);
            location.href = 'http://localhost:3000/buy.html';
        });
    }
}

getAllEvents();