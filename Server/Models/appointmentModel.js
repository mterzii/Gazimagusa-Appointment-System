const mongoose = require('mongoose');

const appointmentCurrentSchema = new mongoose.Schema({
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
  reason: {
    type: String
  },
  status: {
    type: String,
    enum: ['scheduled', 'waiting-confirmation', 'comfirmed', 'cancelled'],
    default: 'scheduled'
  },
  notes: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

appointmentCurrentSchema.index({ doctor_id: 1, appointment_date: 1 });
appointmentCurrentSchema.index({ patient_id: 1, appointment_date: 1 });

module.exports = mongoose.model('appointment-Data', appointmentCurrentSchema);
