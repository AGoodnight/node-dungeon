import express, { Router } from "express";
import { creatureBodyValidatorMW, creatureQueryValidatorMW } from "./creatures.validator";

export function creatureRoutes(controllers: any) {
    const router = express.Router();
    router.get("/", creatureQueryValidatorMW, controllers.CreaturesController.getCreatures)
    router.get("/:id", controllers.CreaturesController.getCreature)
    router.post("/", creatureBodyValidatorMW, controllers.CreaturesController.createCreature)
    return router;
}

