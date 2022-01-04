import { Router } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";
import { authenticateRoutes } from "./authenticate.routes";

const router = Router();

router.use(authenticateRoutes);

export { router };
