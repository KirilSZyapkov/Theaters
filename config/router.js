const router = require('express').Router();

const mainControler = require('../pagesControlers/mainControler');
const authControler = require('../userControlers/authControler');

router.get('/', (req, res)=>{
    res.redirect('/theater');
})

router.use('/theater', mainControler);
router.use('/auth', authControler);


module.exports = router;