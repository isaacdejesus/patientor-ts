import {useParams} from 'react-router-dom';
import React from 'react';
import {useStateValue} from '../state';
import { Entry, Patient, Diagnosis } from '../types';
import {apiBaseUrl }from '../constants';
import axios from 'axios';
const PatientPage = () => {
    const [{ currentPatient, patientCodes}, dispatch ] = useStateValue();
    const {id} = useParams<{id: string}>();

    if(Object.keys(patientCodes).length === 0){
        console.log("I aim heree");
        const setCodes = async () => {
            try{
                const {data: des} = await axios.get<Diagnosis[]>(
                    `${apiBaseUrl}/diagnoses`
                );
                dispatch({type: "ADD_CODES", payload: des});
                }
            catch(error: unknown) {
                console.log(error);
            }
        };
        void setCodes();}
        
    if(currentPatient.name === '000' || currentPatient.id !== id ){
        console.log("stuff is undef");
        const getPatient = async () => {
            try{
                const {data: patient} = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id ?? "d2773336-f723-11e9-8f0b-362b9e155667"}`
                );
                dispatch({type: "ADD_CURRENT_PATIENT", payload: patient});
                console.log("adding current to state: ",currentPatient);
                }
            catch(error: unknown) {
                console.log(error);
            }
        };
        void getPatient();}
    //const val: Patient = returnUser(id ?? "d2773336-f723-11e9-8f0b-362b9e155667");
    const val: Patient = currentPatient;
    const assertNever = (value: never): never => {
        throw new Error(
            `unhandled union member: ${JSON.stringify(value)}`
        );
    };
    const codes = (vals: string[] | undefined) => {
       if(vals) 
            return(
                <div>
                    <h4> Diagnosis codes </h4>
                <ul>
                {vals.map((code: string) => 
                <li key= {code}>
                    {code} {patientCodes[code].name}
                </li>
                    )}
                </ul>
                </div>
            );
    };
    const displayEntries = (Ents: Entry[]) => {
        return(
            <div>
                <h3>Entries </h3>
                {Ents.map((entrie: Entry) => 
                    <div key= {entrie.id}>
                        <i>Description: {entrie.description} </i>
                        <br />
                        <i>Specialist: {entrie.specialist}</i>
                        {codes(entrie.diagnosisCodes)} 
                    </div>
                )} 
            </div>
        );
    };
    const patientType = (): JSX.Element => {
        if(val.entries[0] === undefined)
        return(
            <div>
                <p>{val.name}</p>;
                <h3> No Entries to display </h3>
                <h2>codes: </h2>
            </div>
        );
        switch(val.entries[0].type){
        case 'Hospital':
        return(
        <div>
            <p> Name: {val.name}</p>
            <p> Gender: {val.gender}</p>
            <p> DOB: {val.dateOfBirth}</p>
            <p> Occupation: {val.occupation}</p>
            {displayEntries(val.entries)}
        </div>
        );
        break;
        case "HealthCheck":
        return(
        <div>
            <p> Name: {val.name}</p>
            <p> Gender: {val.gender}</p>
            <p> DOB: {val.dateOfBirth}</p>
            <p> Occupation: {val.occupation}</p>
            {displayEntries(val.entries)}
        </div>
        );
        break;
        case "OccupationalHealthcare":
        return(
        <div>
            <p> Name: {val.name}</p>
            <p> Gender: {val.gender}</p>
            <p> DOB: {val.dateOfBirth}</p>
            <p> Occupation: {val.occupation}</p>
            {displayEntries(val.entries)}
        </div>
        );
        break;
        default:
            return assertNever(val.entries[0]);
            break;
        }
    };
    //if(!val)
    //{//if pt not in state, we get it and add it to state
    return(
        <div>
        {val ? patientType() : ''}
        </div>
    );
};

export default PatientPage;

//didn't do 9.18. don't want to refactor.
