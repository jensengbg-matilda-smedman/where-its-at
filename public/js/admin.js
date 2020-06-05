const inputName = document.querySelector('#inputName');
const inputWhere = document.querySelector('#inputWhere');
const inputDate = document.querySelector('#inputDate');
const inputFrom = document.querySelector('#inputFrom');
const inputTo = document.querySelector('#inputTo');
const inputTickets = document.querySelector('#inputTickets');
const inputPrice = document.querySelector('#inputPrice');
const addEventButton = document.querySelector('#addEventButton');

/* Redirect if staff/admin is not loggedin */
function getToken() {
    return sessionStorage.getItem('auth');
}

async function loggedin() {
    const token = getToken();
    const url = 'http://localhost:3000/auth/loggedin';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer' + token
        }
    });
    const data = await response.json();
    if (!data.loggedIn) {
        location.href = 'http://localhost:3000/login.html';
        sessionStorage.removeItem('auth');
    }
}

/* Create new event */
async function createEvent(event) {
    try {
        const url = 'http://localhost:3000/admin/addevent';

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = response.json();
        return await data;
    } catch(error) {
        console.log('Error in fetch on createEvent() :', error);
    }
}

/* Display events */
function showAllEvents(allEvents) {
    let eventList = document.querySelector('#eventList');
    eventList.innerHTML = '';

    for (let event of allEvents) {
        let eventElem = document.createElement('div');
        eventElem.classList.add('eventitem');
        
        eventElem.innerHTML +=
            '<h5 class="name">' + event.eventName + '</h5>' + 
            '<p class="place">' + event.city + '</h5>' + 
            '<p class="tickets">' + event.tickets + '</h5>' + 
            '<p class="price">' + event.price + '</h5>';

            eventList.append(eventElem);
    }
}

/* Fetch events */
async function getAllEvents() {
    const url = 'http://localhost:3000/admin/showevents';

    try {
        const response = await fetch(url, {
            method: 'GET'
        });
        const data = await response.json();
 
        showAllEvents(data.events);
    } catch (error) {
        console.log('Error in fetch on getAllEvents() : ', error);
    }
}

addEventButton.addEventListener('click', () => {

    let eventObj = {
        eventName: inputName.value,
        city: inputWhere.value,
        date: inputDate.value,
        from: inputFrom.value,
        to: inputTo.value,
        tickets: inputTickets.value,
        price: inputPrice.value
    }
    createEvent(eventObj);
    getAllEvents();
});

getAllEvents();
loggedin();