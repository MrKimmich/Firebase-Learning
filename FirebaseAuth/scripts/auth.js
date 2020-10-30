// Auth Status Changes
auth.onAuthStateChanged(user => {
    if (user){
        console.log('User Logged In: ', user)
    }else{
        console.log('User Logged Out')
    }
})

// Sign-Up
const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm['signup-email'].value
    const password = signupForm['signup-password'].value

    auth.createUserWithEmailAndPassword(email, password).then(cred =>{
        const modal = document.querySelector('#modal-signup')
        M.Modal.getInstance(modal).close()
        signupForm.reset()
    })

})

//Log-Out
const logOut = document.querySelector('#logout')
logOut.addEventListener('click', (e) => {
    e.preventDefault()
    auth.signOut().then(()=>{
    })
})

//Log-In
const logInForm = document.querySelector('#login-form')
logInForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = logInForm['login-email'].value
    const password = logInForm['login-password'].value

    auth.signInWithEmailAndPassword(email, password).then(cred => {

        const modal = document.querySelector('#modal-login')
        M.Modal.getInstance(modal).close()
        logInForm.reset()
    })
})


// Sign UP using Phone Number
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container",
    {
    size: "normal",
    callback: function(response) {
        submitPhoneNumberAuth();
    }
    }
);



function submitPhoneNumberAuth() {
    // We are using the test phone numbers we created before
    var phoneNumber = document.getElementById("phoneNumber").value;
    // var phoneNumber = '+16005551234';
    var appVerifier = window.recaptchaVerifier;
    firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function(confirmationResult) {
        window.confirmationResult = confirmationResult;
    })
    .catch(function(error) {
        console.log(error);
    });
}

function submitPhoneNumberAuthCode() {
    // We are using the test code we created before
    var code = document.getElementById("code").value;
    //var code = '123456';
    confirmationResult
    .confirm(code)
    .then(function(result) {
        var user = result.user;
        console.log(user);
    })
    .catch(function(error) {
        console.log(error);
    });
}


