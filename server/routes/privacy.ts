import express from 'express';
import { AddPrivacy, DeletePolicy, UpdatePolicy, getAllPrivacy } from '../controller/privacyController';

const privacyRouter = express.Router();

privacyRouter.get("/", getAllPrivacy);

privacyRouter.post('/', AddPrivacy);

privacyRouter.put('/:id', UpdatePolicy);

privacyRouter.delete('/:id', DeletePolicy);

export default privacyRouter;