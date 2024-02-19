import { Match } from "../models"
const { v4: uuidv4 } = require('uuid');

let pendingWinner: number|null = null;
const totalPlayers = 64

export const generateBracket = (): Match[] => {
    const players = totalPlayers;
    const matches: Match[] = [];
    const numMatches = players/2;

    // Create initial matches with empty strings for player names
    for (let i = 0; i < numMatches; i++) {
        matches.push({
            id: uuidv4(),
            players: [null,null],
            scores: [null,null,null],
            winner: null
        });
    }

    // Assign players to matches
    let m = 0;
    for (let i = 1; i < players; i+=2) {
        matches[m].players = [i,i+1];
        m++;
    }

    return matches;
};

export const getMatch = (matchID: string, bracket: Match[]): Match|null => {
    for (let i = 0; i < bracket.length; i++) {
        if (bracket[i].id === matchID){
            return bracket[i];
        }
    }
    return null;
};

export const updateScore = (matchID: string, bracket: Match[], winner1: number, winner2: number, winner3: number): Match|null => {
    
    for (let i = 0; i < bracket.length; i++) {
        if (bracket[i].id === matchID){
            if (bracket[i].winner !== null) {
                throw new Error("Winner has already been set. This match can't be updated")
            } 
            if (!bracket[i].players.includes(winner1) || !bracket[i].players.includes(winner2) || !bracket[i].players.includes(winner3)) {
                throw new Error("The scores provided have to be for the players in the match.")
            }
            bracket[i].scores = [winner1,winner2,winner3];
            let winner = getMaxOccurrence([winner1,winner2,winner3]);
            bracket[i].winner = winner;
            if (pendingWinner === null){
                pendingWinner = winner;
            } else {
                bracket.push(createNewMatch(pendingWinner,winner));
                pendingWinner = null;
            }
            return bracket[i];
        }
    }
    throw new Error("The provided match id was not found");
};

export const createNewMatch = (p1: number, p2: number): Match => {
    return {
        id: uuidv4(),
        players: [p1,p2],
        scores: [null,null,null],
        winner: null
    }
}

export const getWinner = (bracket: Match[]): number|null => {
    let totalMatches = totalPlayers-1;

    if (bracket.length == totalMatches && bracket[bracket.length-1].winner !== null) {
        return bracket[bracket.length-1].winner
    }
    return null
}


function getMaxOccurrence(numbers: number[]): number {
    const occurrenceMap: { [key: number]: number } = {};
  
    for (const num of numbers) {
      if (occurrenceMap[num]) {
        occurrenceMap[num]++;
      } else {
        occurrenceMap[num] = 1;
      }
    }
  
    let maxNum: number = numbers[0];
    let maxCount: number = occurrenceMap[numbers[0]];
  
    for (const [key, value] of Object.entries(occurrenceMap)) {
      if (value > maxCount) {
        maxCount = value;
        maxNum = +key;
      }
    }
  
    return maxNum;
  }
  