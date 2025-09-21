import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  HostBinding,
  inject,
  model,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, filter, fromEvent, merge, takeUntil, tap } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { Note } from '../../models/note';
import { DestroyService } from 'src/app/core/destroy.service';
import { ViewAnnotateService } from '../../view-annotate.service';

enum Mode {
  EDIT,
  VIEW,
}

@Component({
  selector: 'ci-note',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, ReactiveFormsModule],
  providers: [DestroyService],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent implements OnInit {
  public readonly note = model.required<Note>();

  protected Mode = Mode;
  protected mode = Mode.EDIT;

  protected textareaControl: FormControl = new FormControl('');

  private document = inject(DOCUMENT);
  private destroy$ = inject(DestroyService);
  private docService = inject(ViewAnnotateService);
  private cdr = this.docService.cdr;

  private zoom$ = toObservable(this.docService.zoom);

  private pointerUp$ = fromEvent(this.document, 'pointerup').pipe(takeUntil(this.destroy$));

  private pointerMove$ = fromEvent(this.document, 'pointermove').pipe(
    debounceTime(1),
    takeUntil(merge(this.pointerUp$, this.destroy$))
  );

  @HostBinding('style.left.px') left = 0;
  @HostBinding('style.top.px') top = 0;

  ngOnInit(): void {
    this.setText();
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
    this.pointerMove$
      .pipe(filter((event: any) => event.layerX > 0 && event.layerY > 0))
      .subscribe((event: any) => {
        const { layerX: left, layerY: top } = event;
        this.top = top;
        this.left = left;
        const note = this.docService.notes.get(this.note().id);
        if (note) {
          note.relPos = this.docService.getConvertedPosition({ top, left }, 'toRelative');
        }
        this.cdr.detectChanges();
      });
  }

  protected removeNote() {
    this.docService.notes.delete(this.note().id);
    this.cdr.detectChanges();
  }

  private setText() {
    this.textareaControl.setValue(this.note().text);
  }

  private updatePosition() {
    const { left, top } = this.note().relPos;
    const pos = this.docService.getConvertedPosition({ left, top }, 'toAbsolute');
    this.left = pos.left;
    this.top = pos.top;
  }

  private attachEvents() {
    this.zoom$.pipe(takeUntil(this.destroy$)).subscribe(() => this.updatePosition());
    this.textareaControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((text) => {
      const note = this.docService.notes.get(this.note().id);
      if (note) {
        note.text = text;
      }
    });
  }
}
