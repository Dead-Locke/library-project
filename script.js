const addNewButton = document.getElementById('addNew');

var myLibrary = [];

function Book(title, author, pages,read_status,favorite){

    this.title = title;
    this.author = author;
    this.pages= pages;
    this.read = read_status;
    this.favorite = favorite
    
}

Book.prototype.info = function() {
    return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? ' ✅ Read' : ' ❌ Not read'}`)
}

function addNew(title, author, pages = 0, read=false, favorite = false ){
        var newBook = new Book (title, author, pages, read)
        myLibrary.push(newBook);
}


const hobbit = new Book('The Hobbit', "J.R.R Tolkien", 310, false, true)
const lotr = new Book('Lord of the Rings', "J.R.R Tolkien", 1178, false, false)
const andromeda_strain = new Book('The Andromeda Strain', 'Michael Crichton', 350, true, true)

myLibrary.push(hobbit, lotr, andromeda_strain)


function display (array) {
    const template = document.getElementById('book_template');
    array.forEach(v => {
        var clone = template.content.cloneNode(true);
        clone.querySelector('.book').dataset.index = array.indexOf(v);
        console.log(clone.querySelector('.book'))
        if(v.read) clone.querySelector('.read_status').classList.add('read')
        if(v.favorite) clone.querySelector('.favorite').classList.add('fav')
        var t = clone.querySelector('.title');
        t.innerHTML = v.title; 
        var a = clone.querySelector('.author');
        a.innerHTML = v.author; 
        var n = clone.querySelector('.num')
        n.innerHTML = v.pages; 
        collection.appendChild(clone)
    } )
}


window.onload = () => display(myLibrary);

function toggleFav(element) {
    element.classList.toggle('fav')
}