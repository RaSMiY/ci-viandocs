/**
 * Заметка:
 *  идентификатор,
 *  положение,
 *  текст
 */
export interface Note {
  id: number;
  relPos: {
    top: number;
    left: number;
  };
  text: string;
}
