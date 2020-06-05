const loginButton = document.querySelector('#loginButton');
const inputUser = document.querySelector('#username');
const inputPass = document.querySelector('#password');

function saveToken(token) {
    sessionStorage.setItem('auth', token);
}

function getToken() {
    return sessionStorage.getItem('auth');
}

/* Check loggin */

async function login(username, password) {
    const url = 'http://localhost:3000/auth/login';

    const account = {
        username: username,
        password: password
    }

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(account),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return await data;
}

/* When loggedin */

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
    return await data;
}

/* Send to admin/staff */

loginButton.addEventListener('click', async () => {
    const username = inputUser.value;
    const password = inputPass.value;    

    let loggedin = await login(username, password);

    if (!loggedin.success) {
        document.querySelector('#errormessage').classList.toggle('hide');
    } else if (loggedin.success && loggedin.role === 'admin') {
        saveToken(loggedin.token);
        setTimeout(() => {
            location.href = 'http://localhost:3000/admin.html'
        }, 100);
    }
    else {
        saveToken(loggedin.token);
        setTimeout(() => {
            location.href = 'http://localhost:3000/verify.html';
        }, 100);
    }
});

loggedin();