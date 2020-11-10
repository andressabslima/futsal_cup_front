import { Team } from './Team';
export interface Match {
    id?: number;
    startAt?: {
        date: string;
        timezone: string,
        timezone_type: number
    };
    endAt?: {
        date: string;
        timezone: string,
        timezone_type: number
    };
    homeScore?: number;
    guestScore?: number;
    homeTeam?: Team;
    guestTeam?: Team;
    cards?:
    {
        card?: string,
        player?: number
    }[],
    goals?:
    {
        goals?: number,
        player?: number
    }[]
}