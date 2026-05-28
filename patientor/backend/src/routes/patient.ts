import express, { type Request, type Response, type NextFunction } from 'express';
import patientService from '../services/patientService.ts';

import { z } from 'zod';
import { NewPatientEntrySchema, type NewPatientEntry, type PatientEntry } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
  const addedEntry = patientService.addPatient(req.body);  
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;