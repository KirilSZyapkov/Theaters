const router = require('express').Router();

const homePage = require('./homeControler');
const { openCreat, creatNewPlay } = require('./createControler');
const { openDetails, likePlay } = require('./detailsControler');
const { openEdit, editPlay } = require('./editControler');
const { sortByDate, sortByLikes } = require('./sortControler');
const deletePlay = require('./deleteControler');

router.get('/', homePage);
router.get('/create', openCreat);
router.get('/details/:id', openDetails);
router.get('/details/like/:id', likePlay);
router.get('/details/edit/:id', openEdit);
router.get('/details/delete/:id', deletePlay);
router.get('/sort-by-date', sortByDate);
router.get('/sort-by-likes', sortByLikes);

router.post('/create', creatNewPlay);
router.post('/details/edit/:id', editPlay);

module.exports = router;