const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    duration_days: { type: Number, required: true },
    instructions: { type: String }
});

const prescriptionSchema = new mongoose.Schema({
    prescription_id: {
        type: String,
        required: true,
        unique: true
    },
    appointment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointmentModel',
        required: true
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctorModel',
        required: true
    },
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patientModel',
        required: true
    },
    date_issued: {
        type: Date,
        default: Date.now
    },
    medicines: [medicineSchema],
    follow_up_date: {
        type: Date
    },
    remarks: {
        type: String
    }
});

prescriptionSchema.index({ patient_id: 1, date_issued: -1 });
prescriptionSchema.index({ doctor_id: 1, date_issued: -1 });

module.exports = mongoose.model('prescription-Data', prescriptionSchema);
