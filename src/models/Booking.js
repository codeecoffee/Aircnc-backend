const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
    {
        date: String,
        approved: Boolean,
        user:
        {
            //record a reference to the User who recorded this info 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        spot:
        {
            //record a reference to the User who recorded this info 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Spot'
        }
    })

module.exports = mongoose.model('Booking', BookingSchema);