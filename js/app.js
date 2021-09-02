/* Search Field */
const searchBook = async () => {
    const SearchField = document.getElementById("input-search");
    const searchText = SearchField.value;
    SearchField.value = "";
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    const res = await fetch(url)
    const data = await res.json()
    displaySearchResult(data)
}
const totalResult = document.getElementById('total-result');

const displaySearchResult = books => {
    const result = `${books.numFound}`;
    function colorResult () {
        totalResult.style.color = 'white'
        totalResult.style.margin = '20px 0'
    }
    /* Total Result Condition */
    if(result === "0"){
        totalResult.innerText =`No result Found`;
        colorResult()
    }else{
        totalResult.innerText =`Total Search Result : ${books.numFound}`
        colorResult()
    }
    /* Search result */
    const searchResult = document.getElementById('search-result');
    const book = books.docs;
    console.log(book);
    searchResult.textContent ='';
    book.forEach(doc => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <div onclick="loadBookDetail(${book.docs})" class="card">
            <img src="https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class="card-img-top w-100 h-100 mx-auto" alt="image">
            <div class="card-body">
                <h5 class="card-title">${doc.title}</h5>
                <p class="card-text">Author name : ${doc.author_name}</p>
                <p class="card-text"> publisher : ${doc.publisher}</p>
                <p class="card-text">First publish year: ${doc.first_publish_year}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div)
    });
}
