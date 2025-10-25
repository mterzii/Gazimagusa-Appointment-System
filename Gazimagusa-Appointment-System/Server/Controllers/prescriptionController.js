const prescriptionModel = require('../Models/prescriptionModel');
const appointmentModel = require('../Models/appointmentModel');
const appointmentPastModel = require('../Models/appointmentPastModel');

exports.createPrescription = async (req, res) => {
    try {
        const { appointment_id, doctor_id, patient_id, medicines, follow_up_date, remarks, diagnosis } = req.body;

        // Create prescription
        const newPrescription = await prescriptionModel.create({
            prescription_id: `PRX-${Date.now()}`,
            appointment_id,
            doctor_id,
            patient_id,
            medicines,
            follow_up_date,
            remarks
        });


        let appointment = await appointmentModel.findById(appointment_id);

        if (appointment) {
            appointment.status = 'completed';
            await appointment.save();

            const completedRecord = await appointmentPastModel.create({
                appointment_id: appointment.appointment_id,
                patient_id: appointment.patient_id,
                doctor_id: appointment.doctor_id,
                appointment_date: appointment.appointment_date,
                status: 'completed',
                prescription_id: newPrescription._id,
                diagnosis,
                outcome: 'Prescription issued',
                completed_at: new Date()
            });

            await appointmentModel.deleteOne({ _id: appointment._id });
        } else {
            // If not in current, link to past appointment
            appointment = await appointmentPastModel.findById(appointment_id);
            if (appointment) {
                appointment.prescription_id = newPrescription._id;
                await appointment.save();
            }
        }

        res.status(201).json({
            success: true,
            message: 'Prescription created and linked successfully',
            data: newPrescription
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
