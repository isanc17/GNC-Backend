import { Router } from 'express';

import { getAllOptions, getOptionsByUser } from '../controllers/optionsController';

const router = Router();

router.get('/all', getAllOptions);
router.get('/byUser', getOptionsByUser);

export default router;
