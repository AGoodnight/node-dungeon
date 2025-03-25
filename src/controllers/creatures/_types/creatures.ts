// Auto generated file, run npm run generate:creatures:ts to rebuild. Do not modify directly.

/**
 * A Creature
 */
export interface CreatureGet {
  id: string;
  name?: string;
  alive?: boolean;
  hp?: number;
  category?: string;
  initiative?: number;
}
// Auto generated file, run npm run generate:creatures:ts to rebuild. Do not modify directly.

/**
 * A Creature
 */
export interface CreaturePostResponse {
  id: string;
}
// Auto generated file, run npm run generate:creatures:ts to rebuild. Do not modify directly.

/**
 * A Creature
 */
export interface CreaturePost {
  name: string;
  alive?: boolean;
  hp?: number;
  category: string;
  initiative?: number;
}
