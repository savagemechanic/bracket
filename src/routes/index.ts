import express from "express";
import { Match } from '../models';
import { generateBracket, getMatch, getWinner, updateScore } from '../utils';

const router = express.Router()

let bracket: Match[];
bracket = generateBracket()

router.get('/matches', (req, res) => {
  res.json({ matches: bracket });
});

router.get('/winner', (req, res) => {
  const winner = getWinner(bracket);
  res.json({winner});
});

router.get('/match/:id', (req, res) => {
  const match = getMatch(req.params.id, bracket);
  res.json({match});
});

router.put('/match/:id', (req, res) => {
  const { score1, score2, score3 } = req.body;
  let match: Match|null = null
  try {
    match = updateScore(req.params.id, bracket, score1, score2, score3);
    res.json({match});
  } catch (e: any) {
    res.json({ error: e.message })
  }
});

export default router