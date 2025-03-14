import { JSONSchemaType } from "ajv"
import { Creature } from "../creatures.types"
import { VALIDATION_ERRORS } from "../errors/creature.errors";

export const CREATURE_CATEGORIES = ["baddie", "player", "npc"]

export const creatureSchema: JSONSchemaType<Creature> = {
    title: "Creature",
    description: "A Creature",
    type: "object",
    properties: {
        id: {
            type: "string",
            nullable: false,
            errorMessage: {
                type: VALIDATION_ERRORS.TYPE,
            }
        },
        name: {
            type: "string",
            nullable: false,
            minLength: 3,
            maxLength: 30,
            errorMessage: {
                type: VALIDATION_ERRORS.TYPE,
                minLength: VALIDATION_ERRORS.MIN_LENGTH,
                maxLength: VALIDATION_ERRORS.MIN_LENGTH,
            }
        },
        alive: {
            type: "boolean",
            default: true,
            errorMessage: {
                type: VALIDATION_ERRORS.TYPE,
            }
        },
        hitpoints: {
            type: "integer",
            default: 10,
            maximum: 100,
            minimum: 0,
            errorMessage: {
                type: VALIDATION_ERRORS.TYPE,
                minLength: VALIDATION_ERRORS.MIN_LENGTH,
                maxLength: VALIDATION_ERRORS.MIN_LENGTH,
            }
        },
        category: {
            type: "string",
            nullable: false,
            minLength: 3,
            maxLength: 30,
            enum: CREATURE_CATEGORIES,
            errorMessage: {
                type: VALIDATION_ERRORS.TYPE,
                minLength: VALIDATION_ERRORS.MIN_LENGTH,
                maxLength: VALIDATION_ERRORS.MIN_LENGTH,
                enum: `Must be one of ${CREATURE_CATEGORIES}`
            }
        },
        initiative: {
            type: "integer",
            default: 0,
            maximum: 20,
            minimum: 0,
            errorMessage: {
                type: VALIDATION_ERRORS.TYPE,
                maximum: VALIDATION_ERRORS.MIN_LENGTH,
                minimum: VALIDATION_ERRORS.MIN_LENGTH,
            }
        },
        x: {
            type: "integer",
            default: 0,
            errorMessage: {
                type: VALIDATION_ERRORS.TYPE,
            }
        },
        y: {
            type: "integer",
            default: 0,
            errorMessage: {
                type: VALIDATION_ERRORS.TYPE,
            }
        }
    },
    required: [
        "name",
        "category"
    ]
};

export const CreatureSchemaKeys = (creatureSchema.properties) ? Object.keys(creatureSchema.properties) : []