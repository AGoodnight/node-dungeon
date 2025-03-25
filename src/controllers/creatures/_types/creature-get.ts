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
/**
 * A Creature
 */
export interface CreaturePostResponse {
  id: string;
}
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
