var Mongoose = require('mongoose')

var ExpenseSchema = new Mongoose.Schema({
    id:{type:Number,unique:true,required:true},
    title:{type:String,required:true},
    category:{type:String,required:true},    
    amount:{type:Number,required:true},
    iscredit:{type:Number,required:true}
})

var ExpenseModel = Mongoose.model('expense',ExpenseSchema)

module.exports = ExpenseModel