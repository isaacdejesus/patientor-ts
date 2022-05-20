import patients from '../data/patients';
import { v1 as uuid } from 'uuid';
import { nonSensitivePatientEntry, patientEntry, newPatientEntry } from '../types'
const getPatients = (): Array<patientEntry> => {
    return patients;
};
const getNonSensitivePatientEntries = (): nonSensitivePatientEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const findById = (id: string): patientEntry | undefined => {
    const entry = patients.find(patient => patient.id === id);
    return entry;
}
const addPatient = (entry: newPatientEntry): patientEntry => {
    const newPatientEntry = {
        id: uuid(), ...entry 
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};
export default {
    getPatients,
    getNonSensitivePatientEntries,
    findById,
    addPatient
};
