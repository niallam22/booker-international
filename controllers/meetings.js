//connect to db models
const Meeting = require('../models/Meeting') 
const Attendee = require('../models/Attendee') 
const { deleteOne } = require('../models/Meeting') 

//connect timezone module
const moment = require('moment-timezone');
moment.tz.setDefault('UTC')

//display facilitator meetings
module.exports = {
    getMeetings: async (req,res)=>{
        try{
            const meetingItems = await Meeting.find({userId:req.user.id})
            const itemsLeft = await Meeting.countDocuments({userId:req.user.id})//
            res.render('meetings.ejs', {meetings: meetingItems, left: itemsLeft, user: req.user, moment : moment})
        }catch(err){
            console.log(err)
        }
    },
    // display specific meeting for the facilitator
    getMeeting: async (req,res)=>{
        try{
            const meetingItem = await Meeting.findById(req.params.id)
            console.log(`meetings controller getMeeting meeting document: ${meetingItem}`)
            
            let attendeeInfo = await Attendee.find({meetingId:req.params.id})
            res.render('meeting.ejs', {meeting: meetingItem, attendees: attendeeInfo, user: req.user, moment : moment})
        }catch(err){
            console.log(err)
        }
    },
    //display specific meeting to attendee
    accessMeeting: async (req,res)=>{
        console.log('this is req.body._id ',req.body._id)
        console.log('this is req.body.access ',req.body.access)
        try{
            const meetingItems = await Meeting.findById(req.body.access)
            console.log(meetingItems)
            res.render('access.ejs', {meetings: meetingItems, user: req.user, moment : moment})
        }catch(err){
            console.log(err)
        }
    },
    //create meeting
    createMeeting: async (req, res)=>{
        console.log('this is req.body',req.body)
        try{
            Meeting.create({userId: req.user.id, meetingTitle: req.body.meetingTitle, notes: req.body.notes, userAvailability: req.body.facilitatorTime, finalMeetingTime: req.body.finalMeetingTime})
            console.log(req.body)
            console.log('Meeting has been created!')
            res.redirect('/meetings')
        }catch(err){
            console.log(err)
        }
    },
    //save attendee availability
    updateAttendeeAvailability: async (req, res)=>{
        console.log('this is req.body',req.body)
        try{
            Attendee.create({attendeeAvailability: req.body.attendeeSelectedTime, attendeeName: req.body.attendeeName, meetingId: req.params.id})
            console.log('Attendee availabiltiy updated!')
            res.redirect('/')
        }catch(err){
            console.log(err)
        }
    },
    //facilitator saves finalised meeting time
    finaliseMeeting: async (req, res)=>{
        try{
            Meeting.findOneAndUpdate({_id:req.params.id},{finalMeetingTime: req.body.finalisedAvailability}, {new: true}, (error, updatedData)=> {
                if(error){
                    console.log(error)
                }else{
                    console.log(updatedData)
                }
            })
            console.log('Meeting finalised!')
            res.redirect('/meetings')
        }catch(err){
            console.log(err)
        }
    },
    //delete meeting
    deleteMeeting: async (req,res)=>{
        try{
            await Meeting.findByIdAndDelete(req.params.id)
            await Attendee.deleteMany({meetingId:req.params.id})
            res.redirect('/meetings')
        }catch(err){
            console.log(err)
        }
    }    
}  