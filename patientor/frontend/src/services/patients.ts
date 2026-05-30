import axios from "axios";
import { Patient, PatientFormValues, EntryWithoutId, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );
  console.log('data', data);

  return data;
};

const get = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  console.log('data', data);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntries = async (id: string, object: EntryWithoutId) => {
  console.log('object in service', object);
  console.log('id in service', id);
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  console.log('data', data);

  return data;
};

export default {
  getAll, get, create, createEntries
};

