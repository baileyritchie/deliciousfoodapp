const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const {catchErrors} = require('../handlers/errorHandlers');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', authController.isLoggedIn,storeController.addStore);
router.post('/add', 
    storeController.upload, 
    catchErrors(storeController.resize),
    catchErrors(storeController.createStore));
router.post('/add/:id', 
    storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.updateStore));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));

router.get('/store/:slug',
catchErrors(storeController.getStorebySlug)
);

router.get('/tags',catchErrors(storeController.getStoresbyTag));
router.get('/tags/:tag',catchErrors(storeController.getStoresbyTag));

router.get('/login',userController.loginForm);
router.post('/login',authController.login);

router.get('/register',userController.registerForm);
//1.validate regis data
//2. actually register user
//3. log them in

router.post('/register',
    userController.validateRegister,
    catchErrors(userController.register),
    authController.login);
router.get('/logout',authController.logout);

router.get('/account',authController.isLoggedIn,userController.account);
router.post('/account',catchErrors(userController.updateAccount));
router.post('/account/forgot',catchErrors(authController.forgot));
router.get('/account/reset/:token',catchErrors(authController.reset));
router.post('/account/reset/:token',
    authController.confirmedPasswords,
    catchErrors(authController.update));
router.get('/map',storeController.mapPage);
router.get('/hearts',authController.isLoggedIn,catchErrors(storeController.getHearts));
router.post('/reviews/:id',authController.isLoggedIn,catchErrors(reviewController.addReview));
/* API Section */

router.get('/api/search', catchErrors(storeController.searchStores));
router.get('/api/stores/near',catchErrors(storeController.mapStores));
router.post('/api/stores/:id/heart',catchErrors(storeController.heartStore));

module.exports = router;
