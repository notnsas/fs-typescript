import { v1 as uuid } from 'uuid';

import { patients } from '../../data/entries.ts';
import type { Patients, Patient, NonSensitivePatientEntry, NewPatientEntry, Entry } from '../types.ts';

import { getPatient } from './patient.utils.ts';

const getEntries = () : Patients => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {  
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({    
    id,    
    name, 
    dateOfBirth, 
    gender, 
    occupation,
    entries
  }));
};

const getEntry = ( id: string ) : Patient => {
  const patient = getPatient(patients, id);
  const patientWithEntries = { ...patient };
  return patientWithEntries;
};

const addPatient = ( entry: NewPatientEntry ): Patient => {  
  const id = uuid();
  const newPatientEntry = {
    id: id,
    ...entry,
    entries: []  
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntries = ( patientId: string, entry: Entry ): Entry => {  
  const id = uuid();
  const patientToEdit = getPatient(patients, patientId);
  console.log("patientToEdit", patientToEdit);
  
  const newEntry = {
    ...entry, 
    id 
  };
  const newEntries = (patientToEdit.entries) ? patientToEdit.entries.concat(newEntry) : [newEntry];
  
  const index = patients.findIndex(
    patient => patient.id === patientToEdit.id
  );
  const editedPatient = {
    ...patientToEdit,
    entries: newEntries
  };
  if (index !== -1) {
    patients[index] = editedPatient;
  }

  return newEntry;
};

export default {
  getEntries,
  getEntry,
  getNonSensitiveEntries,
  addPatient,
  addEntries
};