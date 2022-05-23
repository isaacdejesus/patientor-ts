import { newPatientEntry, Gender } from './types'
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const parseString = (input: unknown): string => {
    if(!input || !isString(input))
        throw new Error('Incorrect format or missing information');
    return input;
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date))
        throw new Error('Incorrect or missing date: ' + date);
    return date;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};
const parseGender = (gender: unknown): Gender => {
    if(!gender || !isGender(gender))
        throw new Error('Incorrect or missing gender: ' + gender);
    return gender;
}
type Fields = {name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown}
const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation}: Fields): newPatientEntry => {
    const newEntry: newPatientEntry = {
        name: parseString(name),
        dateOfBirth:parseDate(dateOfBirth),
        ssn: parseString(ssn),
        gender:parseGender(gender),
        occupation: parseString(occupation),
        entries: []
    };
    return newEntry
};
 export default toNewPatientEntry;
