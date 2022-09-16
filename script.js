let addBtn = document.getElementById('addBtn');

showCard();
console.log('Welcome to notes project');

// If user clicks on the button 'add note', then add note into the local storage.
addBtn.addEventListener('click', function (e) {

    // console.log(e);
    // fetch textarea element by it's id from DOM
    let addText = document.getElementById('addText');

    // fetch the data(key-value) from localstorage.
    let notesElements = localStorage.getItem("notes");  // "notesElements" has a typeof string. 
    // console.log(addText.value.length, addText.value ,notesElements, typeof notesElements);

    // if 1st note is adding, then for that it's previous localstorage is null. 
    if (notesElements == null) {
        noteObj = {};
    }
    else {
        noteObj = JSON.parse(notesElements);
        // console.log(typeof(JSON.parse(notesElements)));
    }

    // console.log(noteObj);
    // if no note has entered in textarea, and then click on "add note"...then no any card should be added in your note.
    if(addText.value.length != 0){
        noteObj.push(addText.value);  // updating object that is there in value of key-value of localstorage.
    }
    
    // Updating value in localstorage. (understand difference b/w above condition and below condition.)
    // DIFFERENCE :- So, we are storing object/array as value in the key (notes) of local storage.
    // and everytime we are updating that key's value...Now, if array/object is not updating, then even if
    // we update the localstorage value, it won't change the content at front. bec, local storage value is still 
    // same as previous value.
    // So, if u don't understand above thing, then simply remember that we are having only one key and one value(object)
    // in local storage, and everytime we are updating the value of local storage (when someone clicks on add note),
    // but everytime that array/object value that is updating in local storage is changing as that array also we are
    // updating in the above step. 

    localStorage.setItem('notes', JSON.stringify(noteObj));


    addText.value = "";
    console.log(noteObj);
    // console.log(noteObj);
    showCard();
})





// function to show cards in "Your Notes" section.
function showCard() {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    // notesObj.push(addText.value);
    let html = '';
    notesObj.forEach(function (element, index) {
        html += `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>
                    `
    });
    
    let NotesElem = document.getElementById("Notes");
    // console.log(NotesElem);
    if(notesObj.length != 0){
        NotesElem.innerHTML = html;
    }
    else{
        NotesElem.innerHTML = `Nothing to show! Please use "Add a Note" button to add your Notes.`
    }

}

// function to delete Note
function deleteNote(index){
    console.log('I am deleting');

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index,1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showCard();
}

// for search functionality
let search = document.getElementById('search');
search.addEventListener('input', function(){
    let noteCard = document.getElementsByClassName('noteCard');
    console.log(noteCard);
    let inputVal = search.value.toLowerCase();
    console.log(inputVal);

    Array.from(noteCard).forEach(function(element){
        // console.log(element);
        let innerelem = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        if(innerelem.includes(inputVal)){
            element.style.display = 'block';
            // element.getElementsByClassName('noteCard')[0].style.display = 'block';
        }
        else{
            element.style.display = 'none';
            // element.getElementsByClassName('noteCard')[0].style.display = 'none';
        }
    })

})