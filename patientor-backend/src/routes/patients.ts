import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';
const patientRouter = express.Router();
patientRouter.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitivePatientEntries());
});

patientRouter.get('/:id', (req, res) => {
    const patient = patientsService.findById(req.params.id);
    if(patient)
        res.send(patient);
    else
        res.sendStatus(404);
});

patientRouter.post('/', (req, res) => {
    try {
        const newPatient = toNewPatientEntry(req.body);
        const addedEntry = patientsService.addPatient(newPatient);
        res.json(addedEntry);
    }
    catch (error: unknown){
        let errorMessage = 'Something went wrong';
        if(error instanceof Error)
            errorMessage += ' Error: ' + error.message;
        res.status(400).send(errorMessage);
    }
});
export default patientRouter;
