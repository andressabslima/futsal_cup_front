import { Player } from './Player';
export interface Team {
    id?: number;
    name?: string;
    points?: number;
    wins?: number;
    looses?: number;
    draws?: number;
    matchs?: number;
    players?: Player[]
}