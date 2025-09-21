import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  HostBinding,
  inject,
  input,
  model,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Note } from '../../models/note';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, filter, fromEvent, merge, takeUntil, tap } from 'rxjs';
import { DestroyService } from 'src/app/core/destroy.service';
import { ViewAnnotateService } from '../../view-annotate.service';
import { toObservable } from '@angular/core/rxjs-interop';

enum Mode {
  EDIT,
  VIEW,
}

@Component({
  selector: 'ci-note',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  providers: [DestroyService],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent implements OnInit {
  public readonly note = model.required<Note>();

  protected Mode = Mode;
  protected mode = Mode.EDIT;

  private document = inject(DOCUMENT);
  private destroy$ = inject(DestroyService);
  private docService = inject(ViewAnnotateService);
  private cdr = this.docService.cdr;

  private zoom$ = toObservable(this.docService.zoom);

  private pointerUp$ = fromEvent(this.document, 'pointerup').pipe(
    tap(() => console.log('Pointer Up')),
    takeUntil(this.destroy$)
  );

  private pointerMove$ = fromEvent(this.document, 'pointermove').pipe(
    debounceTime(1),
    takeUntil(merge(this.pointerUp$, this.destroy$))
  );

  @HostBinding('style.left.px') left = 0;
  @HostBinding('style.top.px') top = 0;

  ngOnInit(): void {
    this.attachEvents();
  }

  protected switchMode() {
    if (this.mode === Mode.EDIT) {
      this.mode = Mode.VIEW;
    } else {
      this.mode = Mode.EDIT;
    }
  }

  protected startDrag($event: UIEvent) {
    // Почему-то появляются события с отрицательными координатами. Надо их отфильтровать.
    // ToDo Выяснить причину и убрать этот костыль.
    this.pointerMove$
      .pipe(filter((event: any) => event.layerX > 0 && event.layerY > 0))
      .subscribe((event: any) => {
        const { layerX: left, layerY: top } = event;
        this.top = top;
        this.left = left;
        // this.note().relPos;
        this.note.update((note) => {
          note.relPos = this.docService.getConvertedPosition({ top, left }, 'toRelative');
          console.log(note);
          return note;
        });
        this.cdr.detectChanges();
      });
  }

  protected removeNote() {
    this.docService.notes = this.docService.notes.filter(
      (note: Note) => note.id !== this.note().id
    );
    this.cdr.detectChanges();
  }

  private updatePosition() {
    console.log(this.note(), this.document);
    const { left, top } = this.note().relPos;
    const pos = this.docService.getConvertedPosition({ left, top }, 'toAbsolute');
    this.left = pos.left;
    this.top = pos.top;
  }

  private attachEvents() {
    this.zoom$.pipe(takeUntil(this.destroy$)).subscribe(() => this.updatePosition());
  }
}
