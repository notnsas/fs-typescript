import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );
  console.log('data', data);

  return data;
};

const get = async ( id: string ) => {
  const { data } = await axios.get<Diagnosis>(
    `${apiBaseUrl}/diagnoses/${id}`
  );
  console.log('data', data);

  return data;
};


export default {
  getAll,
  get
};

