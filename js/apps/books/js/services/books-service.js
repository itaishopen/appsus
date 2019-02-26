import jsonData from './books-storage.js';
import utilService from './util-service.js'

export default {
    init,
    getBooks,
    getBookById,
    writeAReview,
    getReviews,
    deleteAReview,
    iconCurrency,
    getTodayFormatted,
    addBook,
    getBooksData,
    getBookIdx,
    getBookByIdx,
}
var gBooks;
var gFilter = {byName: '', fromPrice:'', toPrice:Infinity}
const BOOKS_KEY = 'books'

init()

function init() {
    gBooks = utilService.loadFromStorage(BOOKS_KEY);    
    if (!gBooks || gBooks.length === 0) {
        gBooks = _createBooks();
        utilService.saveToStorage(BOOKS_KEY, gBooks)
    }
}

function getBooks(filter = gFilter) {
    return gBooks.filter(book => {
        return (book.title.includes(filter.byName) && book.listPrice.amount >= filter.fromPrice &&
            book.listPrice.amount <= filter.toPrice)
    })
}

function getBookById(bookId) {
    return gBooks.find(book => bookId === book.id)
}

function _createBooks() {
    let books = JSON.parse(JSON.stringify(jsonData));
    books.forEach(book => {
        return book.reviews = []
    })
    return books
}

function getBookIdx(bookId) {
    return gBooks.findIndex(book => book.id === bookId)
}

function getBookByIdx(bookIdx) {
    return gBooks[bookIdx];
}

function writeAReview(bookId, review) {
    let reviews = getReviews(bookId)
    reviews.push(review)
    utilService.saveToStorage(BOOKS_KEY, gBooks)
}

function getReviews(bookId) {
    return getBookById(bookId).reviews
}

function deleteAReview(bookId, reviewId) {
    let reviews = getReviews(bookId);
    let reviewIdx = reviews.findIndex(review => review.id === reviewId)
    reviews.splice(reviewIdx, 1)
    utilService.saveToStorage(BOOKS_KEY, gBooks)
}

function iconCurrency(bookId) {
    var symbol = {
        USD: '$', // US Dollar
        EUR: '€', // Euro
        CRC: '₡', // Costa Rican Colón
        GBP: '£', // British Pound Sterling
        ILS: '₪', // Israeli New Sheqel
        INR: '₹', // Indian Rupee
        JPY: '¥', // Japanese Yen
        KRW: '₩', // South Korean Won
        NGN: '₦', // Nigerian Naira
        PHP: '₱', // Philippine Peso
        PLN: 'zł', // Polish Zloty
        PYG: '₲', // Paraguayan Guarani
        THB: '฿', // Thai Baht
        UAH: '₴', // Ukrainian Hryvnia
        VND: '₫', // Vietnamese Dong
    }
    return symbol[getBookById(bookId).listPrice.currencyCode];
}

function getTodayFormatted() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}

function addBook(googleBook) {
    try{
        let book = createABook(googleBook);
        gBooks.push(book)
        utilService.saveToStorage(BOOKS_KEY, gBooks)
        return Promise.resolve(book)
    } catch(error){
        console.log(error)
    }
}

function createABook(googleBook) {    
	return {
        id: googleBook.id,
		title: googleBook.volumeInfo.title ? googleBook.volumeInfo.title : '',
		subtitle: googleBook.volumeInfo.subtitle ? googleBook.volumeInfo.subtitle : '',
		authors: googleBook.volumeInfo.authors ? googleBook.volumeInfo.authors : [],
		publishedDate: googleBook.volumeInfo.publishedDate ? googleBook.volumeInfo.publishedDate : '',
		description: googleBook.volumeInfo.description ? googleBook.volumeInfo.description : '',
		pageCount: googleBook.volumeInfo.pageCount ? googleBook.volumeInfo.pageCount : 0,
		categories: googleBook.volumeInfo.categories ? googleBook.volumeInfo.categories : [],
		thumbnail: googleBook.volumeInfo.imageLinks.thumbnail ? googleBook.volumeInfo.imageLinks.thumbnail : '',
		language: googleBook.volumeInfo.language ? googleBook.volumeInfo.language : '',
		listPrice: {
			amount: (googleBook.saleInfo.saleability === 'FOR_SALE') ? googleBook.saleInfo.listPrice.amount : 0,
			currencyCode: (googleBook.saleInfo.saleability === 'FOR_SALE') ? googleBook.saleInfo.listPrice.currencyCode : '',
			isOnSale: (googleBook.saleInfo.saleability === 'FOR_SALE') ? googleBook.saleInfo.isEbook : false,
		},
		reviews: []
	};
}
function getBooksData(searchInput) {
   return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchInput}`);
}