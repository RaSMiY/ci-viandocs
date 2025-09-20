import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
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
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewAnnotateComponent implements OnInit { 
  // readonly baseUrl = 'https://ru.freepik.com/free-photos-vectors/бесплатные-png';
  protected readonly baseUrl = 'docs/1/';
  // readonly docUrl = 'public/1.json';
  // doc = input.required<Doc>();
  doc = doc;
  // protected doc?: Doc;

  notes: any = [];

  protected readonly docSevice = inject(ViewAnnotateService);

  ngOnInit(): void {
    console.log(this.docSevice.zoom());
  }

  protected addAnnotation(event: PointerEvent) {
    this.notes.push(event);
  }
}
