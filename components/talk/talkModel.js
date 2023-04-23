const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reservationModule = require("../reservation/reservationModule")


const talkSchema = new Schema({
    reservation_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:reservationModule,
        require: true
    },
    meetTime:{
       type:String
    },
    Talk:{
        type:String

    },
    emo: [
        {
          count: {
            type: Number
          },
          emotion: {
            type: String
          }
        }
      ],
      
    word:{
        type:String
    },
    comment:{
        type:String
    }

    
});


module.exports = mongoose.model('talk', talkSchema);