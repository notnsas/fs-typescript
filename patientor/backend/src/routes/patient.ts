import express, { type Request, type Response, type NextFunction } from 'express';
import patientService from '../services/patientService.ts';

import { z } from 'zod';
import { NewPatientEntrySchema, type NewPatientEntry, type PatientEntry, type Entry, HealthCheckEntrySchema, HospitalEntrySchema, OccupationalHealthcareEntrySchema,  } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const id = z.string().parse(req.params.id);
  if (!id) {
    res.status(404).send({error: "Not found"});
  }
  res.send(patientService.getEntry(id));
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

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    z.string().parse(req.params.id);

    const body = z.object({
      type: z.enum([
        "HealthCheck",
        "Hospital",
        "OccupationalHealthcare"
      ])
    }).parse(req.body);

    switch (body.type) {
      case "HealthCheck":
        HealthCheckEntrySchema.parse(req.body);
        break;
      case "Hospital":
        HospitalEntrySchema.parse(req.body);
        break;
      case "OccupationalHealthcare":
        OccupationalHealthcareEntrySchema.parse(req.body);
        break;
      default:
        return assertNever(body.type);
    }
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post('/:id/entries', newEntryParser, (req: Request<{ id: string }, unknown, Entry> , res: Response<PatientEntry>) => {
  console.log("stratring to add entry");

  console.log("req.body", req.body);
  const id = req.params.id;
  const addedEntry = patientService.addEntries(id, req.body);  

  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;