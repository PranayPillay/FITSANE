const joi=require('@hapi/joi')
const authschema=joi.object({
    name: joi.string().min(2).required(),
    Age: joi.number().min(1).required(),
    Gender: joi.string().valid('Male', 'Female', 'Other').required(),
    Email:joi.string().email().lowercase().required(),
    password:joi.string().min(8).required()
})

module.exports={
    authschema
}