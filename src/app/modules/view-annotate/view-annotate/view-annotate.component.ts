import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ci-view-annotate',
  imports: [],
  template: `<p>view-annotate works!</p>`,
  styleUrl: './view-annotate.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewAnnotateComponent { }
