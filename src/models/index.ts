  
export type Match = {
    id: string | null,
    players: [number | null, number | null],
    scores: [number | null, number | null, number | null],
    winner: number | null
};
  
export type Bracket = {
    matches: Match[];
}
  