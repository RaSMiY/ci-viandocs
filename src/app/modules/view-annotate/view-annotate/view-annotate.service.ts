import { ChangeDetectorRef, Injectable, signal } from '@angular/core';

import { Note } from './models/note';
import { PositionInPixels, DimensionsContext, PositionInPercents } from './models/position';

@Injectable({ providedIn: 'root' })
export class ViewAnnotateService {
  public zoom = signal(90);
  public notes: Note[] = [];
  public containerSize = { width: 0, height: 0 };

  public cdr!: ChangeDetectorRef;

  public getConvertedPosition(
    pos: PositionInPixels,
    direction: 'toRelative' | 'toAbsolute'
  ): PositionInPercents {
    const context = this.getDimensionsContext();
    console.log(pos, context);
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

  private getDimensionsContext(): DimensionsContext {
    return { ...this.containerSize, zoom: this.zoom() };
  }
}
