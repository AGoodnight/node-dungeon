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
                type: VALIDATION_ERRORS.TYPE + ' string',
            }
        },
        name: {
            type: "string",
            nullable: false,
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
            default: true,
            errorMessage: {
                type: VALIDATION_ERRORS.TYPE + ' boolean',
            }
        },
        size: {
            type: "string",
            default: "medium"
        },
        type: {
            type: "string",
            default: "medium"
        },
        alignment: {
            type: "string",
            default: "medium"
        },
        hp: {
            type: "integer",
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
            nullable: false,
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
            default: 0,
            maximum: 20,
            minimum: 0,
            errorMessage: {
                type: VALIDATION_ERRORS.TYPE + ' integer',
                minimum: VALIDATION_ERRORS.MINIMUM + ' 0',
                maximum: VALIDATION_ERRORS.MAXIMUM + ' 20',
            }
        },
    },
    required: [
        "name",
        "category"
    ]
};

export const CreatureSchemaKeys = (creatureSchema.properties) ? Object.keys(creatureSchema.properties) : []