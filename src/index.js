import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, getDocs, doc, getDoc, addDoc
} from 'firebase/firestore';

// Initialisierung Firebase
const firebaseConfig = {
    apiKey: "AIzaSyARCmMDIU5LPjBMj_v_tYrhcUh8Aloynpo",
    authDomain: "isef01-quizius-maximus-v2.firebaseapp.com",
    projectId: "isef01-quizius-maximus-v2",
    storageBucket: "isef01-quizius-maximus-v2.appspot.com",
    messagingSenderId: "555791080708",
    appId: "1:555791080708:web:c890c0d237eb00c2764451"
};
const app = initializeApp(firebaseConfig);

// Firestore Database
const db = getFirestore(app);

//--------------------------------------------------- Modul anlegen ---------------------------------------------------
document.getElementById('add_module').addEventListener('click', async () => {
    const newModuleId = document.getElementById('new_module_id').value;
    const newModuleName = document.getElementById('new_module_name').value;

    try {
        await addDoc(collection(db, 'module'), {
            shortname: newModuleId,
            longname: newModuleName
        });
        alert('Modul erfolgreich hinzugefügt!');
    } catch (error) {
        console.error('Fehler beim Hinzufügen des Moduls: ', error);
    }
});

//------------------------------------------------- Lektion anlegen -------------------------------------------------
// Dropdown mit module shortname, longname füllen
const sectionShortnameDropdown = document.getElementById('opt_section_module_id');
const sectionLongnameSelect = document.getElementById('opt_section_module_name');

async function handleSectionModuleDropdown() {
    const moduleSnapshot = await getDocs(collection(db, 'module')); 
    moduleSnapshot.forEach((doc) => {
        const option = document.createElement('option');
        option.value = doc.id; // Verwende die Dokument-ID als Wert
        option.textContent = doc.data().shortname;
        sectionShortnameDropdown.appendChild(option);
    });
}

// longname anzeigen, wenn shortname ausgewählt wird
sectionShortnameDropdown.addEventListener('change', async (event) => {
    const selectedShortname = event.target.value;
    if (selectedShortname) {
        const moduleDoc = await getDoc(doc(db, 'module', selectedShortname));
        if (moduleDoc.exists()) {
            sectionLongnameSelect.value = moduleDoc.data().longname;
        }
    } else {
        sectionLongnameSelect.value = '';
    }
});

// Neue Lektion speichern
document.getElementById('add_section').addEventListener('click', async () => {
    const selectedShortname = sectionShortnameDropdown.value;
    const newSectionName = document.getElementById('new_section_name').value;
    const newSectionNumber = document.getElementById('new_section_number').value;

    if (selectedShortname && newSectionName && newSectionNumber) {
        try {
            // Füge ein neues Dokument in die questionnaires-Collection ein
            const questionnaireRef = await addDoc(collection(db, 'questionnaires'), {
                moduleID: doc(db, 'module', selectedShortname) // Referenz zur Dokument-ID
            });

            // Füge eine neue Lektion in die sections-Subcollection des neuen Fragebogens ein
            await addDoc(collection(db, 'questionnaires', questionnaireRef.id, 'sections'), {
                name: newSectionName,
                number: newSectionNumber
            });

            alert('Lektion erfolgreich hinzugefügt!');
        } catch (error) {
            console.error('Fehler beim Hinzufügen der Lektion: ', error);
        }
    } else {
        alert('Bitte füllen Sie alle Felder aus.');
    }
});


//--------------------------------------------- Fragenkatalog bearbeiten ---------------------------------------------
// Dropdown mit module shortname, longname füllen
const questionShortnameDropdown = document.getElementById('module_id');
const questionLongnameSelect = document.getElementById('module_name');
const questionSectionnameDropdown = document.getElementById('section_name');
const questionSectionnumberSelect = document.getElementById('section_number');

async function handleModuleDropdown() {
    const moduleSnapshot = await getDocs(collection(db, 'module'));
    moduleSnapshot.forEach((doc) => {
        const option = document.createElement('option');
        option.value = doc.id; // Verwende die Dokument-ID als Wert
        option.textContent = doc.data().shortname;
        questionShortnameDropdown.appendChild(option);
    });
}

// longname anzeigen, wenn shortname ausgewählt wird
questionShortnameDropdown.addEventListener('change', async (event) => {
    const selectedShortname = event.target.value;
    if (selectedShortname) {
        const moduleDoc = await getDoc(doc(db, 'module', selectedShortname));
        if (moduleDoc.exists()) {
            sectionLongnameSelect.value = moduleDoc.data().longname;
            await handleSectionDropdown(selectedShortname);
        }
    } else {
        sectionLongnameSelect.value = '';
        questionSectionnameDropdown.innerHTML = '<option value="">Bitte wählen</option>';
        questionSectionnumberSelect.value = '';
        questionSectionnameDropdown.disabled = true;
    }
});

// Dropdown mit Lektionbezeichnungen füllen
async function handleSectionDropdown(moduleId) {
    questionSectionnameDropdown.innerHTML = '<option value="">Bitte wählen</option>'; // Reset Dropdown
    const questionnairesSnapshot = await getDocs(collection(db, 'questionnaires'));
    questionnairesSnapshot.forEach(async (questionnaireDoc) => {
        if (questionnaireDoc.data().moduleID.id === moduleId) {
            const sectionsSnapshot = await getDocs(collection(db, 'questionnaires', questionnaireDoc.id, 'sections'));
            sectionsSnapshot.forEach((sectionDoc) => {
                const option = document.createElement('option');
                option.value = sectionDoc.id; // Verwende die Dokument-ID als Wert
                option.textContent = sectionDoc.data().name;
                questionSectionnameDropdown.appendChild(option);
            });
        }
    });
    questionSectionnameDropdown.disabled = false;
}

// Lektionnummer anzeigen, wenn Lektionbezeichnung ausgewählt wird
questionSectionnameDropdown.addEventListener('change', async (event) => {
    const selectedSectionId = event.target.value;
    const selectedShortname = questionShortnameDropdown.value;
    if (selectedSectionId && selectedShortname) {
        const questionnairesSnapshot = await getDocs(collection(db, 'questionnaires'));
        questionnairesSnapshot.forEach(async (questionnaireDoc) => {
            if (questionnaireDoc.data().moduleID.id === selectedShortname) {
                const sectionDoc = await getDoc(doc(db, 'questionnaires', questionnaireDoc.id, 'sections', selectedSectionId));
                if (sectionDoc.exists()) {
                    questionSectionnumberSelect.value = sectionDoc.data().number;
                }
            }
        });
    } else {
        questionSectionnumberSelect.value = '';
    }
});


// Initialisierung des Dropdown beim Laden der Seite
window.onload = () => {
    handleSectionModuleDropdown();
    handleModuleDropdown();
};














/* 
// Populate module dropdown
async function populateModuleDropdown() {
    const moduleSelect = document.getElementById('module_id');
    const snapshot = await getDocs(moduleCollectionRef);
    snapshot.forEach((doc) => {
        const option = document.createElement('option');
        option.value = doc.id;
        option.textContent = doc.data().shortname;
        moduleSelect.appendChild(option);
    });
}

// Populate section dropdown based on selected module
async function populateSectionDropdown(moduleId) {
    const sectionSelect = document.getElementById('section_name');
    sectionSelect.innerHTML = '<option value="">Bitte wählen</option>'; // Clear previous options

    const q = query(questionnairesCollectionRef, where('moduleID', '==', doc(db, 'module', moduleId)));
    const snapshot = await getDocs(q);
    for (const doc of snapshot.docs) {
        const sectionSnapshot = await getDocs(collection(db, `${doc.ref.path}/section`));
        sectionSnapshot.forEach((sectionDoc) => {
            const option = document.createElement('option');
            option.value = sectionDoc.id;
            option.textContent = sectionDoc.data().name;
            sectionSelect.appendChild(option);
        });
    }
}

// Populate questions based on selected section
async function populateQuestions(moduleId, sectionId) {
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = ''; // Clear previous questions

    const q = query(questionnairesCollectionRef, where('moduleID', '==', doc(db, 'module', moduleId)));
    const snapshot = await getDocs(q);
    for (const doc of snapshot.docs) {
        const sectionSnapshot = await getDocs(collection(db, `${doc.ref.path}/section`));
        for (const sectionDoc of sectionSnapshot.docs) {
            if (sectionDoc.id === sectionId) {
                const questionsSnapshot = await getDocs(collection(db, `${sectionDoc.ref.path}/questions`));
                questionsSnapshot.forEach((questionDoc) => {
                    const questionData = questionDoc.data();
                    const questionElement = document.createElement('div');
                    questionElement.classList.add('form-row');
                    questionElement.innerHTML = `
                        <label for="question_${questionDoc.id}">Frage:</label>
                        <input type="text" id="question_${questionDoc.id}" value="${questionData.question}" readonly>
                        <div class="form-row">
                            <label for="option1_${questionDoc.id}">1. Antwort:</label>
                            <input type="text" id="option1_${questionDoc.id}" value="${questionData.option1}" readonly>
                            <input type="checkbox" id="correct1_${questionDoc.id}" ${questionData.correctAnswer === 'option1' ? 'checked' : ''} disabled>
                            <label for="correct1_${questionDoc.id}">Antwort korrekt</label>
                        </div>
                        <div class="form-row">
                            <label for="option2_${questionDoc.id}">2. Antwort:</label>
                            <input type="text" id="option2_${questionDoc.id}" value="${questionData.option2}" readonly>
                            <input type="checkbox" id="correct2_${questionDoc.id}" ${questionData.correctAnswer === 'option2' ? 'checked' : ''} disabled>
                            <label for="correct2_${questionDoc.id}">Antwort korrekt</label>
                        </div>
                        <div class="form-row">
                            <label for="option3_${questionDoc.id}">3. Antwort:</label>
                            <input type="text" id="option3_${questionDoc.id}" value="${questionData.option3}" readonly>
                            <input type="checkbox" id="correct3_${questionDoc.id}" ${questionData.correctAnswer === 'option3' ? 'checked' : ''} disabled>
                            <label for="correct3_${questionDoc.id}">Antwort korrekt</label>
                        </div>
                        <div class="form-row">
                            <label for="option4_${questionDoc.id}">4. Antwort:</label>
                            <input type="text" id="option4_${questionDoc.id}" value="${questionData.option4}" readonly>
                            <input type="checkbox" id="correct4_${questionDoc.id}" ${questionData.correctAnswer === 'option4' ? 'checked' : ''} disabled>
                            <label for="correct4_${questionDoc.id}">Antwort korrekt</label>
                        </div>
                    `;
                    questionsContainer.appendChild(questionElement);
                });
            }
        }
    }
}

// Event listener for adding a new question
document.getElementById('add_question_button').addEventListener('click', addNewQuestion);

function addNewQuestion() {
    const newQuestionsContainer = document.getElementById('new_questions_container');
    const questionId = `question_${Date.now()}`; // Unique ID based on timestamp

    const questionElement = document.createElement('div');
    questionElement.classList.add('form-row');
    questionElement.innerHTML = `
        <label for="${questionId}">Frage:</label>
        <input type="text" id="${questionId}" name="questions[]" placeholder="Neue Frage">
        <div class="form-row">
            <label for="option1_${questionId}">1. Antwort:</label>
            <input type="text" id="option1_${questionId}" name="option1_${questionId}" placeholder="Antwort 1">
            <input type="checkbox" id="correct1_${questionId}" name="correct_${questionId}" value="option1">
            <label for="correct1_${questionId}">Antwort korrekt</label>
        </div>
        <div class="form-row">
            <label for="option2_${questionId}">2. Antwort:</label>
            <input type="text" id="option2_${questionId}" name="option2_${questionId}" placeholder="Antwort 2">
            <input type="checkbox" id="correct2_${questionId}" name="correct_${questionId}" value="option2">
            <label for="correct2_${questionId}">Antwort korrekt</label>
        </div>
        <div class="form-row">
            <label for="option3_${questionId}">3. Antwort:</label>
            <input type="text" id="option3_${questionId}" name="option3_${questionId}" placeholder="Antwort 3">
            <input type="checkbox" id="correct3_${questionId}" name="correct_${questionId}" value="option3">
            <label for="correct3_${questionId}">Antwort korrekt</label>
        </div>
        <div class="form-row">
            <label for="option4_${questionId}">4. Antwort:</label>
            <input type="text" id="option4_${questionId}" name="option4_${questionId}" placeholder="Antwort 4">
            <input type="checkbox" id="correct4_${questionId}" name="correct_${questionId}" value="option4">
            <label for="correct4_${questionId}">Antwort korrekt</label>
        </div>
    `;
    newQuestionsContainer.appendChild(questionElement);
}

// Toggle edit mode
function toggleEditMode(enable) {
    const questionsContainer = document.getElementById('questions-container');
    const newQuestionsContainer = document.getElementById('new_questions_container');
    const inputs = questionsContainer.querySelectorAll('input[type="text"], input[type="checkbox"]');
    const newInputs = newQuestionsContainer.querySelectorAll('input[type="text"], input[type="checkbox"]');
    const buttons = document.querySelectorAll('#delete_question, #add_question, .add button[type="submit"], #add_question_button');

    inputs.forEach(input => {
        input.readOnly = !enable;
        input.disabled = !enable;
    });

    newInputs.forEach(input => {
        input.readOnly = !enable;
        input.disabled = !enable;
    });

    buttons.forEach(button => {
        button.disabled = !enable;
    });
}

// Event listener for edit button
document.getElementById('edit_question').addEventListener('click', (e) => {
    const isEditable = e.target.dataset.editable === 'true';
    toggleEditMode(!isEditable);
    e.target.dataset.editable = !isEditable;
    e.target.textContent = isEditable ? 'Bearbeiten' : 'Bearbeitung beenden';
});

// Initial population of module dropdown
populateModuleDropdown();

// Event listener for module dropdown change
document.getElementById('module_id').addEventListener('change', async (e) => {
    const moduleId = e.target.value;
    const moduleNameInput = document.getElementById('module_name');
    const sectionSelect = document.getElementById('section_name');
    const editButton = document.getElementById('edit_question');

    if (moduleId !== 'new') {
        const moduleDoc = await getDoc(doc(db, 'module', moduleId));
        moduleNameInput.value = moduleDoc.data().longname;
        sectionSelect.disabled = false;
        await populateSectionDropdown(moduleId);
        editButton.disabled = false;
    } else {
        moduleNameInput.value = '';
        sectionSelect.disabled = true;
        editButton.disabled = true;
    }
});

// Event listener for section dropdown change
document.getElementById('section_name').addEventListener('change', async (e) => {
    const sectionId = e.target.value;
    const moduleId = document.getElementById('module_id').value;
    const sectionNumberInput = document.getElementById('section_number');
    const editButton = document.getElementById('edit_question');

    if (moduleId !== 'new' && sectionId) {
        const q = query(questionnairesCollectionRef, where('moduleID', '==', doc(db, 'module', moduleId)));
        const snapshot = await getDocs(q);
        for (const doc of snapshot.docs) {
            const sectionSnapshot = await getDocs(collection(db, `${doc.ref.path}/section`));
            for (const sectionDoc of sectionSnapshot.docs) {
                if (sectionDoc.id === sectionId) {
                    sectionNumberInput.value = sectionDoc.data().number;
                    await populateQuestions(moduleId, sectionId);
                    editButton.disabled = false;
                }
            }
        }
    }
}); */

