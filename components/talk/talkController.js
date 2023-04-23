const talkModel = require("./talkModel");
const mongoose = require('mongoose');

const talkController = {
    add: async(req, res) => {
        
        try {
            const { reservation,meetTime,Talk,emo,word,comment} = req.body;
            
            const talk = await talkModel.create({              
               reservation_id:reservation,
               meetTime:meetTime,
               Talk,
               emo:emo,
               word,
               comment
            
            });
            res.json({
                status: true,
                message: 'Added',
                value: { talk }
            })
        } catch (err) {
            res.json({
                status: false,
                message: 'Not Added',
                err: err
            })
        }
    },
    find: async (req, res) => {  
        try {
            const talk = await talkModel.aggregate([
                {
                    $match: {
                        reservation_id: new mongoose.Types.ObjectId(req.body.reservation_id)
                    }
                },
               
               
            ]);
    
            res.json({
                status: true,
                talk
            });
        } catch (err) {
            res.json({
                status: false,
                err: err.message
            });
        }
    }
    
}

module.exports = talkController;