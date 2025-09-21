import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { KeyValuePipe } from '@angular/common';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { Doc } from './models/doc';
import { ViewAnnotateService } from './view-annotate.service';
import { NoteComponent } from './components/note/note.component';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs';
import { DestroyService } from 'src/app/core/destroy.service';

@Component({
  selector: 'ci-view-annotate',
  imports: [MatSlideToggleModule, NoteComponent, KeyValuePipe],
  providers: [DestroyService],
  templateUrl: './view-annotate.component.html',
  styleUrl: './view-annotate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewAnnotateComponent implements OnInit, OnDestroy {
  protected readonly baseUrl = 'docs/1/';
  readonly docUrl = '1.json';

  protected readonly docService = inject(ViewAnnotateService);

  private cdr = inject(ChangeDetectorRef);
  private zone = inject(NgZone);
  private hostEl = inject(ElementRef);

  private http = inject(HttpClient);
  private destroy$ = inject(DestroyService);

  private observer = new ResizeObserver((entries) => {});

  constructor() {
    this.docService.cdr = this.cdr;
  }

  get doc() {
    return this.docService.doc;
  }

  ngOnInit(): void {
    this.http
      .get(`${this.docUrl}`, {
        observe: 'body',
        responseType: 'json',
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((doc: any) => {
        this.docService.doc = doc;
        this.cdr.detectChanges();
      });
    this.attachEvents();
  }

  protected addAnnotation(event: PointerEvent) {
    const { layerX: left, layerY: top } = event;
    const posInPercents = this.docService.getConvertedPosition({ top, left }, 'toRelative');
    const id = Date.now();
    this.docService.notes.set(id, {
      id,
      relPos: posInPercents,
      text: '',
    });
  }

  private attachEvents() {
    this.observer = new ResizeObserver((entries) => {
      this.zone.run(() => {
        const { width, height } = entries[0].contentRect;
        this.docService.containerSize = { width, height };
      });
    });

    this.observer.observe(this.hostEl.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.unobserve(this.hostEl.nativeElement);
  }
}
