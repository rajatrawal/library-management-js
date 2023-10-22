displayBooks();
function displayBooks() {

    let nameText = localStorage.getItem("nameText");
    let authorText = localStorage.getItem("authorText");
    let typeText = localStorage.getItem("typeText");
    if (nameText == null) {
        nameArray = [];
        authorArray = [];
        typeArray = [];
    }
    else {
        nameArray = JSON.parse(nameText);
        authorArray = JSON.parse(authorText);
        typeArray = JSON.parse(typeText);
    }

    if (nameText == "[]" || localStorage.length == 0) {
        document.getElementById("notBook").style.display = "block";
    }
    else {
        document.getElementById("notBook").style.display = "none";
    }
    let uiString = "";
    tableBody = document.getElementById("tableBody");
    nameArray.forEach(function (element, index) {
        uiString += `
            
                <tr class="tableRow">
                    <th scope="row">${index + 1}</th>
                    <td class="bookNameClass">${element}</td>
                    <td class="bookAuthorClass">${authorArray[index]}</td>
                    <td class="bookTypeClass">${typeArray[index]}</td>
                    <td><button  class="btn btn-light" onclick="deleteBook(${index})">Delete BooK</button></td>
                </tr>

    `

    })

    tableBody.innerHTML = uiString;


}

document.getElementById("searchTxt").addEventListener("input", function search(e) {
    inputValue = document.getElementById("searchTxt").value.toLowerCase();
    rows=document.getElementsByClassName("tableRow");
    let i=0;
    Array.from(rows).forEach(function(element){
        let bookName=element.getElementsByClassName("bookNameClass")[0].innerText.toLowerCase();
        let bookAuthor=element.getElementsByClassName("bookAuthorClass")[0].innerText.toLowerCase();
        let bookType=element.getElementsByClassName("bookTypeClass")[0].innerText.toLowerCase();
        

        if (bookName.includes(inputValue) || bookType.includes(inputValue) || bookAuthor.includes(inputValue)){
            
            element.style.display="table-row";
            i++;
            document.getElementById("heads5").style.display="none";
        }
        else{
            element.style.display="none";
        }
    })
    if (i==0){
        document.getElementById("heads5").style.display="block";
    }


});



function deleteBook(index) {
    let nameText = localStorage.getItem("nameText");
    let authorText = localStorage.getItem("authorText");
    let typeText = localStorage.getItem("typeText");
    if (nameText == null) {
        nameArray = [];
        authorArray = [];
        typeArray = [];

    }
    else {
        nameArray = JSON.parse(nameText);
        authorArray = JSON.parse(authorText);
        typeArray = JSON.parse(typeText);
    }
    nameArray.splice(index, 1);
    authorArray.splice(index, 1);
    typeArray.splice(index, 1);
    localStorage.setItem("nameText", JSON.stringify(nameArray));
    localStorage.setItem("authorText", JSON.stringify(authorArray));
    localStorage.setItem("typeText", JSON.stringify(typeArray));
    displayBooks();
};
function deleteAll() {
    localStorage.clear();
    displayBooks();

}
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

function Display() {

}


Display.prototype.clear = function () {
    let libraryFrom = document.getElementById("libraryFrom");
    libraryFrom.reset();

}

Display.prototype.addToStorage = function (book) {
    let nameText = localStorage.getItem("nameText");
    let authorText = localStorage.getItem("authorText");
    let typeText = localStorage.getItem("typeText");
    if (nameText == null) {
        nameArray = [];
        authorArray = [];
        typeArray = [];

    }
    else {
        nameArray = JSON.parse(nameText);
        authorArray = JSON.parse(authorText);
        typeArray = JSON.parse(typeText);
    }
    let bookName = book.name;
    let authorName = book.author;
    let bookType = book.type;
    nameArray.push(bookName);
    authorArray.push(authorName);
    typeArray.push(bookType);

    localStorage.setItem("nameText", JSON.stringify(nameArray));
    localStorage.setItem("authorText", JSON.stringify(authorArray));
    localStorage.setItem("typeText", JSON.stringify(typeArray));


}

Display.prototype.validate = function (book) {
    let libraryFrom = document.getElementById("libraryFrom");
    if (book.name.length < 2 || book.author.length < 2 || book.type.length < 0) {
        return false;
    }
    else {
        return true;
    }

}
Display.prototype.showMassage = function (type, massage, strongMassage) {

    alertMassage = document.getElementById("alert");
    alertMassage.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>${strongMassage}</strong> ${massage}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
    setTimeout(function () {
        alertMassage.innerHTML = "";
    }, 2000)
};

let libraryFrom = document.getElementById("submitBtn");
function libraryFromSubmit(e) {
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("authorName").value;

    let python = document.getElementById("python");
    let c = document.getElementById("c");
    let javascript = document.getElementById("javascript");
    let type;
    if (python.checked) {
        type = python.value;
    }
    else if (c.checked) {
        type = c.value;
    }
    else {
        type = javascript.value;
    }


    let book = new Book(name, author, type);
    let display = new Display();

    if (display.validate(book)) {
        display.addToStorage(book);
        displayBooks();

        display.showMassage("success", " Added Book . ", "Succesfully")
    }
    else {
        display.showMassage("danger", " Please Fulfill Valid Information.", "Error")
    }
    display.clear();
    e.preventDefault();
}
libraryFrom.addEventListener("click", libraryFromSubmit);

