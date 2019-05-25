const checkMillionDollarIdea = (req, res, next) => {
    const numWeeks = req.body.numWeeks;
    const weeklyRevenue = req.body.weeklyRevenue;
    const value =  numWeeks * weeklyRevenue;

    if (value < 1000000 || !numWeeks || !weeklyRevenue || typeof numWeeks !== 'number' || typeof weeklyRevenue !== 'number') {
        return res.status(400).send();
    }
    next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
