const { getType } = require('../controllers/typeController');

const getTypeHandler = async (req,res) => {
    try{
        const allTypes = await getType(req,res);
        res.json(allTypes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getTypeHandler,
}
