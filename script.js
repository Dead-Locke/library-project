
// ------Objects---------
var myLibrary = [];

function Book(title, author, pages, read_status, favorite) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read_status;
    this.favorite = favorite

}

Book.prototype.info = function () {
    return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? ' ✅ Read' : ' ❌ Not read'}`)
}

function addNew(title, author, pages = 0, read = false, favorite = false) {
    var newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook);
}


const hobbit = new Book('The Hobbit', "J.R.R Tolkien", 310, false, true)
const lotr = new Book('Lord of the Rings', "J.R.R Tolkien", 1178, false, false)
const andromeda_strain = new Book('The Andromeda Strain', 'Michael Crichton', 350, true, true)
const dune = new Book('Dune', "Frank Herbert", 412, true, true)

myLibrary.push(hobbit, lotr, andromeda_strain, dune)

// ---------functions and listeners----------------
const addNewButton = document.getElementById('addNew');
const books = document.querySelectorAll('.book');
var favButtons = document.querySelectorAll('.favorite');
var readButtons = document.querySelectorAll('.read_status');
var deleteButtons = document.querySelectorAll('.delete');


function displayBooks(array) {
    const template = document.getElementById('book_template');
    while(collection.firstChild) collection.firstChild.remove()

    array.forEach(v => {
        var clone = template.content.cloneNode(true);
        clone.querySelector('.book').dataset.index = array.indexOf(v);

        if (v.read) clone.querySelector('.read_status').classList.add('read')
        if (v.favorite) clone.querySelector('.favorite').classList.add('fav')
        var t = clone.querySelector('.title');
        t.innerHTML = v.title;
        var a = clone.querySelector('.author');
        a.innerHTML = v.author;
        var n = clone.querySelector('.num')
        n.innerHTML = v.pages;
        collection.appendChild(clone) //'collection' is not defined? WTF???
    })
    
    initialize(); //update button nodelists and event listeners
}


function toggleFav(element) {
    console.log('toggle favorite')
    let bookParent = element.closest('.book');
    let idx = bookParent.dataset.index;
    myLibrary[idx].favorite = !myLibrary[idx].favorite
    element.classList.toggle('fav')
}

function toggleReadStatus(element) {
    let bookParent = element.closest('.book');
    let idx = bookParent.dataset.index;
    myLibrary[idx].read = !myLibrary[idx].read;
    element.classList.toggle('read')
}

function deleteBook(element) {
    let bookParent = element.closest('.book');
    let idx = bookParent.dataset.index;
    let b = myLibrary[idx];
    myLibrary.splice(idx, 1);
    displayBooks(myLibrary)
}

function initialize(){
    favButtons = document.querySelectorAll('.favorite');
    readButtons = document.querySelectorAll('.read_status');
    deleteButtons = document.querySelectorAll('.delete');
    
    favButtons.forEach(x => x.onclick = () => toggleFav(x))
    readButtons.forEach(x => x.onclick = () => toggleReadStatus(x))
    deleteButtons.forEach(x => x.onclick = () => deleteBook(x)) 
}


displayBooks(myLibrary)






