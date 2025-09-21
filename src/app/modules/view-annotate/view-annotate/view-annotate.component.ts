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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Doc } from './models/doc';
import doc from '../../../../../public/1.json';
import { ViewAnnotateService } from './view-annotate.service';
import { NoteComponent } from './components/note/note.component';

@Component({
  selector: 'ci-view-annotate',
  imports: [MatSlideToggleModule, NoteComponent],
  templateUrl: './view-annotate.component.html',
  styleUrl: './view-annotate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewAnnotateComponent implements OnInit, OnDestroy {
  // readonly baseUrl = 'https://ru.freepik.com/free-photos-vectors/бесплатные-png';
  protected readonly baseUrl = 'docs/1/';
  // readonly docUrl = 'public/1.json';
  // doc = input.required<Doc>();
  doc = doc;
  // protected doc?: Doc;

  protected readonly docService = inject(ViewAnnotateService);

  private cdr = inject(ChangeDetectorRef);
  private zone = inject(NgZone);
  private hostEl = inject(ElementRef);

  private observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      console.log('width', entry.contentRect.width);
      console.log('height', entry.contentRect.height);
    });
  });

  constructor() {
    this.docService.cdr = this.cdr;
  }

  ngOnInit(): void {
    this.attachEvents();
  }

  protected addAnnotation(event: PointerEvent) {
    const { layerX: left, layerY: top, clientX, clientY, view } = event;
    const posInPercents = this.docService.getConvertedPosition({ top, left }, 'toRelative');
    console.log(posInPercents);
    this.docService.notes.push({
      id: Date.now(),
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
