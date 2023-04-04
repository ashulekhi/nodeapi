var Express = require('express')
var ExpenseModel = require('./expense.model')

var router = Express.Router()

router.post('/api/addexpense',(req,res)=>{
    req.body.id = Date.now()
    var expenseObj = new ExpenseModel(req.body)
    expenseObj.save().then((newexpense)=>{
          console.log("New Expense addded", newexpense)
          res.send({
              data:newexpense
          })
    },(error)=>{
        console.log("error in saving expense")
        res.send({
            error:"Error in Creating Expense"
        })
    })
})

router.get('/api/expenses',(req,res)=>{
    ExpenseModel.find({},(err,expenses)=>{
        if(err){
            res.send({
                error:"Error in getting Expenses"
            })
        }
        else{
            res.send({
                data:expenses
            })
        }
    })
})



module.exports = router