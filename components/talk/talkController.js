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
                        reservation_id: new mongoose.Types.ObjectId(req.query.reservation_id)
                    }
                    
                },
                {
                    $unwind: "$emo" // separate each element of the "emo" array into separate documents
                },
                {
                    $sort: {
                        "emo.count": -1 // sort in descending order based on the "count" property of "emo"
                    }
                },
                {
                    $group: {
                        _id: "$_id", // group the documents back together based on their original "_id"
                        talk: { $push: "$$ROOT" } // combine the documents back into an array called "talk"
                    }
                },
                {
                    $project: {
                        _id: 0, // exclude the "_id" field from the final output
                        talk: 1 // include the "talk" array in the final output
                    }
                }
            ]);
            if(talk===[]){
                res.json({
                    status: false,
                    message:'Data not found'
                });
            }
    
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
    },
    put: async (req,res ) => {
        try{
            const talk = await talkModel.aggregate([
                {
                    $match: {
                        reservation_id: new mongoose.Types.ObjectId(req.query.reservation_id)
                    }
                },
               
               
            ]);


         
        }catch (err){
            res.json({
                status: false,
                err: err.message
            });
        }
    },
   test: async(req, res) => {
        const alper =[{
            reservation_id:"61234a8a8e0f90691ab34abcd",
            meetTime:"2:00 PM",
            Talk:"Talking about GPT-3",
            emo:[
                { "count": 5, "emotion": "happy" },
                { "count": 3, "emotion": "neutral" },
                { "count": 2, "emotion": "angry" }
              ],
            word:"chatbot",
            comment:"Interesting conversation!"
            },
      {
            reservation_id:"61234a8a8e0f90691ab34abcd",
            meetTime:"2:00 PM",
            Talk:"Talking about GPT-3",
            emo:[
                { "count": 5, "emotion": "happy" },
                { "count": 3, "emotion": "neutral" },
                { "count": 2, "emotion": "angry" }
              ],
            word:"chatbot",
            comment:"Interesting conversation!"
        },
       { 
            reservation_id:"61234a8a8e0f90691ab34abcd",
            meetTime:"2:00 PM",
            Talk:"Talking about GPT-3",
            emo:[
                { "count": 5, "emotion": "happy" },
                { "count": 3, "emotion": "neutral" },
                { "count": 2, "emotion": "angry" }
              ],
            word:"chatbot",
            comment:"Interesting conversation!"
        },
        {
            reservation_id:"61234a8a8e0f90691ab34abcd",
            meetTime:"2:00 PM",
            Talk:"Talking about GPT-3",
            emo:[
                { "count": 5, "emotion": "happy" },
                { "count": 3, "emotion": "neutral" },
                { "count": 2, "emotion": "angry" }
              ],
            word:"chatbot",
            comment:"Interesting conversation!"
        }]
        try {
             alper.map((item)=>(
                   talkModel.create({              
                    reservation_id:item.reservation_id,
                    meetTime:item.meetTime,
                    Talk:item.Talk,
                    emo:item.emo,
                    word:item.word,
                    comment:item.comment
                 
                 })
             ))
            
            
            res.json({
                status: true,
                message: 'Added'
                
            })
        } catch (err) {
            res.json({
                status: false,
                message: 'Not Added',
                err: err
            })
        }
    },
}

module.exports = talkController;