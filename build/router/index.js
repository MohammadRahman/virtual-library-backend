"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var book_1 = require("../controller/book");
var user_1 = require("../controller/user");
var user_2 = require("../middlewares/user");
var user_3 = require("../schemas/user");
var schemaValidate_1 = require("../utils/schemaValidate");
function routes(app) {
    // !API Working
    app.get('/api/healthcheck', function (req, res) {
        res.sendStatus(200);
    }),
        // ! User create/login
        app.post('/api/user/create', (0, schemaValidate_1.validate)(user_3.createUserSchema), user_1.createUserHandler);
    app.post('/api/user/login', (0, schemaValidate_1.validate)(user_3.loginUserSchema), user_1.createUserLoginHandler);
    app.put('/api/user/update', user_2.requireSignIn, user_1.beAnAuthor);
    //! protected route check
    app.get('/api/books', user_2.requireSignIn, function (req, res) {
        res.sendStatus(200);
    });
    // !Book routes
    app.post('/api/create/book', user_2.requireSignIn, user_2.isAuthor, book_1.createNewBookHandler);
    app.put('/api/update/book/:id', user_2.requireSignIn, book_1.updateCountAndStoreUserId);
    app.get('/api/get/books', user_2.requireSignIn, user_2.isReader, book_1.getBookListsHandler);
    app.get('/api/get/my/books', user_2.requireSignIn, user_2.isAuthor, book_1.getMyBooks);
}
exports.routes = routes;
