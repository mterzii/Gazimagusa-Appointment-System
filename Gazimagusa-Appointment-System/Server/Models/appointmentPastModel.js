const mongoose = require('mongoose');

const appointmentPastSchema = new mongoose.Schema({
  appointment_id: {
    type: String,
    required: true,
    unique: true
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patientModel',
    required: true
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctorModel',
    required: true
  },
  appointment_date: {
    type: Date,
    required: true
  },
  diagnosis: {
    type: String
  },
  outcome: {
    type: String
  },
  status: {
    type: String,
    enum: ['completed', 'cancelled', 'no-show'],
    default: 'completed'
  },
  prescription_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'prescriptionModel'
  },
  notes: {
    type: String
  },
  completed_at: {
    type: Date,
    default: Date.now
  }
});

appointmentPastSchema.index({ patient_id: 1, appointment_date: -1 });
appointmentPastSchema.index({ doctor_id: 1, appointment_date: -1 });

module.exports = mongoose.model('appointmentPast-Data', appointmentPastSchema);
