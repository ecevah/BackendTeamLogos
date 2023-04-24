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
          anger: {
            count: {
            type: Number
          },
          text: {
            type: String,
            default:'Kızgın'
          }
        },
        happy:{
          count:{
            type: Number
          },
          text:{
            type:String,
            default:'Mutlu'
          }
        },
        fear:{
          count:{
            type: Number
          },
          text:{
            type:String,
            default:'Korkmak'
          }
        },
        disgust:{
          count:{
            type: Number
          },
          text:{
            type:String,
            default:'İğrenmek'
          }
        },
        sad:{
          count:{
            type: Number
          },
          text:{
            type:String,
            default: 'Üzgün'
          }
        },
        surprised:{
          count:{
            type: Number
          },
          text:{
            type:String,
            default: 'Şaşırmak'
          }
        },
        neutral:{
          count:{
            type: Number
          },
          text:{
            type:String,
            default: ' Nötr'
          }
        },

        
        }
      ],
      
      word: [
        {
          count: {
            type: Number
          },
          root: {
            type: String
          }
        }
      ],
    comment:{
        type:String
    }

    
});


module.exports = mongoose.model('talk', talkSchema);