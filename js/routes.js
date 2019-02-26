import homePage from './pages/home-page-cmp.js'
import aboutPage from './pages/about-page-cmp.js'
import bookApp from './pages/book-app-cmp.js'
import bookDetails from './pages/book-details-cmp.js'
import reviewAdd from './pages/review-add-cmp.js'

export default [
    { path: '/', component: homePage },
    { path: '/about', component: aboutPage },
    { path: '/book', component: bookApp },
    { path: '/book/:bookId', component: bookDetails },
    { path: '/bookReview/:bookId', component: reviewAdd },
]
