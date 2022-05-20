import diagnoses from '../data/diagnoses'
import { diagnoseEntry } from '../types'
const getDiagnoses = (): Array<diagnoseEntry> => {
    return diagnoses;
};

export default {
    getDiagnoses
};
