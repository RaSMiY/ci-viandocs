import { Note } from './note';

export interface Doc {
  name: string;
  pages: Array<{
    number: number;
    imageUrl: string;
  }>;
  notes?: Note[];
}
