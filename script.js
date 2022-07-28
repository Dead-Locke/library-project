
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

const hobbit = new Book('2001: A Space Odyssey', "Arthur C. Clarke", 221, false, true)
const lotr = new Book('Lord of the Rings', "J.R.R Tolkien", 1178, false, false)
const andromeda = new Book('The Andromeda Strain', 'Michael Crichton', 350, true, false)
const dune = new Book('Dune', "Frank Herbert", 412, true, true)

myLibrary.push(hobbit, lotr, andromeda, dune) // push initial set of books to library

// ---------functions and listeners----------------
const addNewButton = document.getElementById('addNewButton');
const books = document.querySelectorAll('.book');
var favButtons = document.querySelectorAll('.favorite');
var readButtons = document.querySelectorAll('.read_status');
var deleteButtons = document.querySelectorAll('.delete');
const modal = document.getElementById('modal')
const newBookForm = document.getElementById('addBookForm');
const submitBtn = document.querySelector('.btn');
const allFilter = document.getElementById('all_filter')
const readFilter = document.getElementById('read_filter')
const unreadFilter = document.getElementById('unread_filter')
const favFilter = document.getElementById('fav_filter')
const allCount = document.querySelector('.allCount')
const readCount = document.querySelector('.readCount')
const unreadCount = document.querySelector('.unreadCount')
const favCount = document.querySelector('.favCount')

function displayBooks(array) {
    const template = document.getElementById('book_template'); //get book template
    while(collection.firstChild) collection.firstChild.remove() //clear area, also 'collection' is not defined? WTF???

    array.forEach(bk => {
        var clone = template.content.cloneNode(true); //clone template for book display
        var t = clone.querySelector('.title'); 
        var a = clone.querySelector('.author'); 
        var n = clone.querySelector('.num') 

        clone.querySelector('.book').dataset.index = myLibrary.indexOf(bk); //assign index to book from library array

        if (bk.read) clone.querySelector('.read_status').classList.add('read') //toggle read status
        if (bk.favorite) clone.querySelector('.favorite').classList.add('fav') //toggle fav status
        t.innerHTML = bk.title; 
        a.innerHTML = bk.author;
        n.innerHTML = bk.pages;

        collection.appendChild(clone) //add cloned template to collection on page

    })
    
    initializeBookButtons(); //update button nodelists and event listeners
    updateCount();
}

function addNew(title, author, pages = 0, read = false, favorite = false) {
    var newBook = new Book(title, author, pages, read,favorite)
    myLibrary.push(newBook);
}


function toggleStatus(element, status) {
    let bookParent = element.closest('.book'); //identify closes book to clicked element
    let idx = bookParent.dataset.index; //get its index value
    if(status =='read') myLibrary[idx].read = !myLibrary[idx].read; //toggle read stats
    if(status =='fav') myLibrary[idx].favorite = !myLibrary[idx].favorite; //toggle fav status
    element.classList.toggle(`${status}`)
    updateCount();
}

function deleteBook(element) {
    let bookParent = element.closest('.book');
    let idx = bookParent.dataset.index;
    myLibrary.splice(idx, 1);
    displayBooks(myLibrary)
}

function initializeBookButtons(){
    favButtons = document.querySelectorAll('.favorite');
    readButtons = document.querySelectorAll('.read_status');
    deleteButtons = document.querySelectorAll('.delete');
    
    favButtons.forEach(x => x.onclick = () => toggleStatus(x,'fav'))
    readButtons.forEach(x => x.onclick = () => toggleStatus(x,'read'))
    deleteButtons.forEach(x => x.onclick = () => deleteBook(x)) 
}

function filterBook(status) {
    if(status == 'r') displayBooks(myLibrary.filter(x=> x.read))
    if(status == 'f') displayBooks(myLibrary.filter(x=> x.favorite))
    if(status == 'u') displayBooks(myLibrary.filter(x=> !x.read))
    if(status == 'a') displayBooks(myLibrary)
}

function updateCount(){
    let booksRead = myLibrary.filter(x => x.read)
    let booksUnread = myLibrary.length - booksRead.length;
    let booksFav = myLibrary.filter(x=> x.favorite)
    let allBooks = myLibrary.length

    allCount.innerText = ` - ${allBooks}`
    readCount.innerText = ` - ${booksRead.length}`
    unreadCount.innerText = ` - ${booksUnread}`
    favCount.innerText = ` - ${booksFav.length}`
}

closeModal = () => modal.style.display = "none";

newBookForm.onsubmit = (e) => {
    e.preventDefault();
    let title = newBookForm.elements['titleField'].value
    let author = newBookForm.elements['authorField'].value
    let pages = newBookForm.elements['pageField'].value || 0;
    let read = document.getElementById('r').checked
    let fav = document.getElementById('f').checked

    addNew(title, author, pages, read, fav);
    displayBooks(myLibrary);
    closeModal()
    addBookForm.reset(); //clear form
}


addNewButton.onclick = () => modal.style.display = 'flex' //show form modal
window.onclick = (e) => {if(e.target == modal) closeModal()} //close form if clicked anywhere but form
allFilter.onclick = () => filterBook('a');
readFilter.onclick = () => filterBook('r');
unreadFilter.onclick = () => filterBook('u');
favFilter.onclick = () => filterBook('f');
    
displayBooks(myLibrary) //initial display of library

