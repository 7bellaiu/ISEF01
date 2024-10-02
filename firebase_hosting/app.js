document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();

    const db = firebase.firestore();

    const myPost = db.collection('Kataloge').doc('Kat1');
    myPost.get()
            .then(doc => {
                const data = doc.data();
                const contentElement = document.getElementById("content");
                const nameElement = document.createElement("p");
                const descriptionElement = document.createElement("p");
                nameElement.textContent = data.name;
                descriptionElement.textContent = data.description;
                contentElement.appendChild(nameElement);
                contentElement.appendChild(descriptionElement);
            })
            
});

function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result =>{
        const user = result.user;
        console.log(`Hello ${user.displayName}`);
    })
    .catch(console.log)
}