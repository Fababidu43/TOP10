export interface Game {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  players: string;
  duration: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  category: 'expression' | 'reflexion' | 'creativite' | 'ambiance';
  interactive: boolean;
  rules: string[];
  materials: string[];
  variants?: string[];
}

export interface GameFilter {
  search: string;
  category: string;
  players: string;
  difficulty: string;
}

export interface TelephoneRound {
  id: string;
  playerId: string;
  playerName: string;
  content: string;
  type: 'phrase' | 'drawing';
}

export interface TelephoneGame {
  id: string;
  players: string[];
  rounds: TelephoneRound[];
  currentRound: number;
  currentPlayer: number;
  isComplete: boolean;
  originalPhrase: string;
}