import { Team } from './Team';
export interface Player {
    id?: number,
    name?: string;
    cpf?: string;
    number?: number;
    totalGoalsScored?: number;
    totalYellowCards?: number;
    totalRedCards?: number;
    team?: Team;
}