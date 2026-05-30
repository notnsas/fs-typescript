import express from 'express';
import diagnoseService from '../services/diagnoseService.ts';
import * as z from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getEntries());
});

router.get('/:id', (req, res) => {
  const id = z.string().parse(req.params.id);
  if (!id) {
    res.status(404).send({error: "Not found"});
  }
  res.send(diagnoseService.getEntry(id));
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;