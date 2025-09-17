import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'ci-view-annotate',
  imports: [MatSlideToggleModule],
  templateUrl: './view-annotate.component.html',
  styleUrl: './view-annotate.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewAnnotateComponent { }
