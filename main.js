const formData = {
    nombre: "John",
    apellido: "Doe",
    email: "johndoe@example.com",
    telefono: "123456789",
    mensaje: "Hola, desde fetch.",
    recaptchaResponse: "xxxxxxxxxxxxx",
    csrfToken: ""
};

function sendPost() {
    fetch('http://iot3.ischdesign.com:33333/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-React-Server-Location': window.location.origin
        },
        body: JSON.stringify(formData)
    }).then(response => {
        if (response.ok) {
            return "status: " + response.status;
        } else {
            throw new Error('Error en la pet');
        }
    }).then(data => {
        console.log(data);
    }).catch(error => {
        console.log(error);
    });
}

fetch('http://iot3.ischdesign.com:33333/get-csrf', {
    method: 'GET',
    headers: {
        'X-React-Server-Location': window.location.origin
    }
}).then(response => {
    if (response.ok) {
        return response.text();
    } else {
        throw new Error('Error en la pet');
    }
}).then(data => {
    console.log("CSRF TOKEN:");
    console.log(data);
    formData.csrfToken = data;
    sendPost();
}).catch(error => {
    console.log(error);
});

