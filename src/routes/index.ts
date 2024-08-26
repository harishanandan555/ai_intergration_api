import { Router } from 'express';
import AuthRouter from './Auth';
import MasterRouter from './Master';
import IntegrationRouter from './Integration';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/master', MasterRouter);
router.use('/integration', IntegrationRouter);

export default router;
