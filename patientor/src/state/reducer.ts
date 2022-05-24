import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
    | {
        type: "ADD_CODES";
        payload: Diagnosis[] ;
    }
    | {
        type: "ADD_CURRENT_PATIENT";
            payload: Patient;
        };

    

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_CODES":
          return {
            ...state,
              patientCodes: {
                  ...action.payload.reduce(
                    (memo, code) => ({...memo, [code.code]: code}),
                      {}
                  ),
                  ...state.patientCodes
              }
          };
      case "ADD_CURRENT_PATIENT":
          {
              return {
                  ...state,
                 currentPatient: action.payload,
              };
          }
    default:
      return state;
  }
};
