import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, getDocs, doc,
    addDoc, deleteDoc
} from 'firebase/firestore';

//Step 1: Initialisierung Firebase
const firebaseConfig = {
    apiKey: "AIzaSyARCmMDIU5LPjBMj_v_tYrhcUh8Aloynpo",
    authDomain: "isef01-quizius-maximus-v2.firebaseapp.com",
    projectId: "isef01-quizius-maximus-v2",
    storageBucket: "isef01-quizius-maximus-v2.appspot.com",
    messagingSenderId: "555791080708",
    appId: "1:555791080708:web:c890c0d237eb00c2764451"
};
const app = initializeApp(firebaseConfig);

//Step2: Firestore Database
//init services
const database = getFirestore();

//collection reference
const collectionReference = collection(database, 'questionnaires');

//get collection data
getDocs(collectionReference)
    .then((snapshot) => {
        let counters = [];
        snapshot.docs.forEach((document) => {
            counters.push({ ...document.data(), id: document.moduleID });
        })
    })
    .catch(error => {
        console.log(error.message);
    })

// adding counters
const addQuestionnaireForm = document.querySelector('.add');
addQuestionnaireForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addDoc(collectionReference, {
        moduleID: addQuestionnaireForm.module_id.value,
        moduleName: addQuestionnaireForm.module_name.value,
    })
        .then(() => {
            addQuestionnaireForm.reset();
        })
});

// deleting counters
const deleteQuestionnaireForm = document.querySelector('.delete');
deleteQuestionnaireForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const documentReference = doc(database, 'questionnaires', deleteQuestionnaireForm.id.value);

    deleteDoc(documentReference)
        .then(() => {
            deleteQuestionnaireForm.reset();
        })
});