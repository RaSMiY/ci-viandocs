import { ChangeDetectorRef, Injectable, output, signal } from '@angular/core';

import { Note } from './models/note';
import { DimensionsContext, Position } from './models/position';
import { Doc } from './models/doc';

/**
 * Служба предназначена для хранения общих для компонентов данных и функций.
 */
@Injectable({ providedIn: 'root' })
export class ViewAnnotateService {
  public zoom = signal(90);
  public containerSize = { width: 0, height: 0 };

  public doc?: Doc;
  public notes: Map<number, Note> = new Map([]);

  public cdr!: ChangeDetectorRef;

  /**
   * Выводит в консоль список заметок в документе.
   */
  public saveNotes() {
    if (this.doc) {
      this.doc.notes = Array.from(this.notes.values());
      console.log(this.doc);
    }
  }

  /**
   * Преобразует относительные координаты в процентах в абсолютные в пикселях и обратно.
   *
   * @param pos координаты
   * @param direction направление преобразования
   * @returns преобразованные координаты
   */
  public getConvertedPosition(pos: Position, direction: 'toRelative' | 'toAbsolute'): Position {
    const context = this.getDimensionsContext();
    let [x, y] = [0, 0];
    const centerX = context.width / 2;
    const mutiplier = direction === 'toRelative' ? 100 / context.zoom : context.zoom / 100;
    const delta = Math.round(Math.abs(centerX - pos.left) * mutiplier);
    if (pos.left <= centerX) {
      x = centerX - delta;
    } else {
      x = centerX + delta;
    }
    y = Math.round(pos.top * mutiplier);
    return { left: x, top: y };
  }

  /**
   *
   * @returns текущий контекст - размер контейнера и масштаб
   */
  private getDimensionsContext(): DimensionsContext {
    return { ...this.containerSize, zoom: this.zoom() };
  }
}
