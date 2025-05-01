/*
const storeController = require("../controllers/store.controller");
const express = require("express");
const router = express.Router();

router.get('/getAll', storeController.getAllStores);
router.post('/create', storeController.createStore);

module.exports = router;
*/

const storeController = require("../controllers/store.controller");
const express = require("express");
const router = express.Router();

router.get('/getAll', storeController.getAllStores);
router.post('/create', storeController.createStore);
router.get('/:id', storeController.getStoreById);  // Ambil berdasarkan ID
router.put('/', storeController.updateStore);       // Update store
router.delete('/:id', storeController.deleteStore); // Hapus store

module.exports = router;
