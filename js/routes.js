import homePage from './pages/home-page-cmp.js'
// import aboutPage from './pages/about-page-cmp.js'
import bookApp from './pages/book-app-cmp.js'
import bookDetails from './apps/books/pages/book-details-cmp.js'
import reviewAdd from './apps/books/pages/review-add-cmp.js'
import keepApp from './apps/keep/pages/miss-keep-cmp.js'
import mailApp from './pages/email-page-cmp.js'
import mailDetails from './apps/email/cmps/email-details-cmp.js'


export default [
    { path: '/', component: homePage },
    // { path: '/about', component: aboutPage },
    // { path: '/book', component: bookApp },
    // { path: '/book/:bookId', component: bookDetails },
    // { path: '/bookReview/:bookId', component: reviewAdd },
    { path: '/miss-keep', component: keepApp },
    { path: '/email/:noteId?', name: 'email', component: mailApp },
    // { path: '/email', component: mailApp, props: (route) => ({ query: route.query.q }) },
    { path: '/email/details/:emailId', component: mailDetails },
    { path: '/book', component: bookApp },
    { path: '/book/:bookId', component: bookDetails },
    { path: '/bookReview/:bookId', component: reviewAdd },

]
