export interface Doc {
  name: string;
  pages: Array<{
    number: number;
    imageUrl: string;
  }>;
}
