const ticketNumberInput = document.querySelector('#ticketNumberInput');
const verifyButton = document.querySelector('#verifyButton');

function getToken() {
    return sessionStorage.getItem('auth');
}
/* if not logged in, redirect */

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
 
 /* Fetch ticket from db */

 async function getId(id) {
    const url = `http://localhost:3000/events/getticket/${id}`;
 
    try {
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
                if(!data.id) {
                    document.querySelector('#validTicket').classList.add('hide');
                    document.querySelector('#notValidTicket').classList.toggle('hide');
                } else {
                    return await data.id;
                } 
    } catch (error) {
        console.log('Error in fetch on getTicket() : ', error);
    }
}

/* Remove ticket from db */

async function deleteTicket(id) {
    const url = `http://localhost:3000/events/deleteticket/${id}`;

    const response = await fetch(url, {
        method: 'DELETE'
    });

    const data = await response.json();
    if(data.id) {
        document.querySelector('#notValidTicket').classList.add('hide');
        return await data.id;
    }
}
function verify() {
    const ticketNumberInput = document.querySelector('#ticketNumberInput');
    const verifyButton = document.querySelectorAll('#verifyButton');
    
    for(let i = 0; i < verifyButton.length; i++) {
        verifyButton[i].addEventListener('click', async () => {
            let number = ticketNumberInput.value;
            let ticketnumber = await getId(number);

            if (number === ticketnumber.id) {
                document.querySelector('#validTicket').classList.toggle('hide');
                deleteTicket(ticketnumber.id);
            } else {
                document.querySelector('#notValidTicket').classList.toggle('hide');}
        });
    }
}

verify();
loggedin();