let myLibrary = []

function Book(title, author, pagesCount, isRead) {
  this.title = title
  this.author = author
  this.pagesCount = pagesCount
  this.isRead = isRead

  this.info = () =>
    `${this.title} by ${this.author}, ${this.pagesCount} pages, ${
      this.isRead ? "" : "not "
    }read${this.isRead ? "" : " yet"}`
}

function addBookToLibrary(title, author, pagesCount, isRead) {
  myLibrary.push(new Book(title, author, pagesCount, isRead))
}

function removeBookAtIndex(index) {
  myLibrary.splice(index, 1)
  displayBooks()
}

function toggleReadForBook(book) {
  book.isRead = !book.isRead
  displayBooks()
}

function displayBooks() {
  const booksSection = document.getElementById("books")
  if (booksSection.childNodes.length >= 1) {
    booksSection.removeChild(booksSection.childNodes[0])
  }
  const booksTable = document.createElement("table")

  const tableHeader = document.createElement("thead")
  const cntHead = document.createElement("th")
  cntHead.textContent = "#"
  tableHeader.appendChild(cntHead)
  const titleHead = document.createElement("th")
  titleHead.textContent = "Title"
  tableHeader.appendChild(titleHead)
  const authorHead = document.createElement("th")
  authorHead.textContent = "Author"
  tableHeader.appendChild(authorHead)
  const pagesCountHead = document.createElement("th")
  pagesCountHead.textContent = "Pages"
  tableHeader.appendChild(pagesCountHead)
  const isReadHead = document.createElement("th")
  isReadHead.textContent = "Read?"
  tableHeader.appendChild(isReadHead)
  booksTable.appendChild(tableHeader)

  const tableBody = document.createElement("tbody")
  myLibrary.forEach((it, index) => {
    const bookRow = document.createElement("tr")

    const bookIndex = document.createElement("td")
    bookIndex.textContent = index + 1
    bookRow.appendChild(bookIndex)

    const bookTitle = document.createElement("td")
    bookTitle.textContent = it.title
    bookRow.appendChild(bookTitle)

    const bookAuthor = document.createElement("td")
    bookAuthor.textContent = it.author
    bookRow.appendChild(bookAuthor)

    const pagesCount = document.createElement("td")
    pagesCount.textContent = it.pagesCount
    bookRow.appendChild(pagesCount)

    const isRead = document.createElement("td")
    isRead.textContent = it.isRead
    bookRow.appendChild(isRead)

    const removeBookButton = document.createElement("button")
    removeBookButton.textContent = "Remove"
    removeBookButton.addEventListener("click", () => removeBookAtIndex(index))
    bookRow.appendChild(removeBookButton)

    const toggleReadButton = document.createElement("button")
    toggleReadButton.textContent = "Read"
    toggleReadButton.addEventListener("click", () => toggleReadForBook(it))
    bookRow.appendChild(toggleReadButton)

    tableBody.appendChild(bookRow)
  })
  booksTable.appendChild(tableBody)
  booksSection.appendChild(booksTable)
}

addBookToLibrary("Titlu 1", "Autor 1", 100, true)
addBookToLibrary("Titlu 2", "Autor 2", 200, false)

// Buttons
const addBookButton = document.getElementById("add-book-button")
addBookButton.addEventListener("click", (event) => {
  const title = prompt("Enter the book's title")
  if (title === null || title === "") {
    return
  }

  const author = prompt("Enter the book's author")
  if (author === null || author === "") {
    return
  }

  const pagesCount = +prompt("Enter the book's pages count")
  if (pagesCount === null || pagesCount === 0) {
    return
  }

  const isRead = confirm("Did you read the book?")

  addBookToLibrary(title, author, pagesCount, isRead)
  displayBooks()
})

// Functionality
displayBooks()
