//export type Gender = 'male' | 'female' | 'other';
export enum Gender {
    Male= 'male',
    Female= 'female',
    Other= 'other'
}
export type nonSensitivePatientEntry = Omit<patientEntry, 'ssn' >;
export type newPatientEntry = Omit<patientEntry, 'id'>;
export interface diagnoseEntry {
    code: string; 
    name: string; 
    latin?: string;
}

export interface patientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
}
interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<diagnoseEntry['code']>;
}
export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
interface Discharge {
    date: string;
    criteria: string;
}
interface SickLeave {
    startDate: string;
    endDate: string;
}
interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}
interface HostpitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}
interface OccupationalHealthCareCheckEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}
export type Entry = | HostpitalEntry | OccupationalHealthCareCheckEntry | HealthCheckEntry;
export type PublicPatient = Omit<patientEntry, 'ssn' | 'entries'>
