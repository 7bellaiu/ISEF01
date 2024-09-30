document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();

    const db = firebase.firestore();

    const myPost = db.collection('Kataloge').doc('Kat1');
    myPost.get()
            .then(doc => {
                const data = doc.data();
                document.write(data.name + `<br>`);
                document.write(data.description);
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