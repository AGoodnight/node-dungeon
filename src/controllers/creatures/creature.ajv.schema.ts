import { JSONSchemaType } from "ajv"
import { CreatureGet } from "./_types/creatures.types"
import { VALIDATION_ERRORS } from "./partials/errors.partials";

export const CREATURE_CATEGORIES = ["baddie", "player", "npc"]

export const creatureGetSchema: JSONSchemaType<CreatureGet> = {
    title: "BaseCreature",
    description: "A BaseCreature",
    type: "object",
    properties: {
        id: {
            type: "string",
            errorMessage: {
                type: VALIDATION_ERRORS.TYPE + ' string',
            }
        },
        name: {
            type: "string",
            nullable: true,
            minLength: 3,
            maxLength: 30,
            errorMessage: {
                type: VALIDATION_ERRORS.TYPE,
                minLength: VALIDATION_ERRORS.MIN_LENGTH + ' 3 characters',
                maxLength: VALIDATION_ERRORS.MAX_LENGTH + ' 30 characters',
            }
        },
        alive: {
            type: "boolean",
            nullable: true,
            errorMessage: {
                type: VALIDATION_ERRORS.TYPE + ' boolean',
            }
        },
        hp: {
            type: "integer",
            nullable: true,
            default: 10,
            maximum: 100,
            minimum: 0,
            errorMessage: {
                type: VALIDATION_ERRORS.TYPE,
                minimum: VALIDATION_ERRORS.MINIMUM + ' 0',
                maximum: VALIDATION_ERRORS.MAXIMUM + ' 100',
            }
        },
        category: {
            type: "string",
            nullable: true,
            minLength: 3,
            maxLength: 30,
            enum: CREATURE_CATEGORIES,
            errorMessage: {
                type: VALIDATION_ERRORS.TYPE + ' string',
                minLength: VALIDATION_ERRORS.MIN_LENGTH + ' 3 characters',
                maxLength: VALIDATION_ERRORS.MIN_LENGTH + ' 30 characters',
                enum: `Must be one of ${CREATURE_CATEGORIES}`
            }
        },
        initiative: {
            type: "integer",
            nullable: true,
            maximum: 20,
            minimum: 0,
            errorMessage: {
                type: VALIDATION_ERRORS.TYPE + ' integer',
                minimum: VALIDATION_ERRORS.MINIMUM + ' 0',
                maximum: VALIDATION_ERRORS.MAXIMUM + ' 20',
            }
        },
    },
    required: ["id"]
};

export const CreatureSchemaKeys = (creatureGetSchema.properties) ? Object.keys(creatureGetSchema.properties) : []