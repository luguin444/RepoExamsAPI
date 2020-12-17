const joi = require('joi');

function validatePostedExamSchema (data) {

    const dataPostedExam = joi.object({
        name: joi.string().required(),           //seria legal regex 2020.123
        subject: joi.string().required(),
        professor: joi.string().required(),
        categorie: joi.string().valid('P1','P2','P3','PF','2chamada','Outras').required(),
        link: joi.string().uri().required()
	});

    const validation = dataPostedExam.validate(data);
	return !validation.error;
}


module.exports = {
	validatePostedExamSchema
};
