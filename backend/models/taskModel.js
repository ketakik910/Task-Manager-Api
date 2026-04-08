const {model,Schema} = require('mongoose');

const taskSchema = new Schema({
    title:{
        type:String, 
        required:true
    },
    description:{
        type:String, 
        required:true
    },
    status:{
        type:String,
        enum:['pending','in progress','completed'],
        default:'pending'
    },
    //to associate task with a user
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
},{
    timestamps:true
});

const Task = model('task',taskSchema);
module.exports = Task;