import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ViewAnnotateService } from '../../modules/view-annotate/view-annotate/view-annotate.service';

@Component({
  selector: 'ci-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly docSevice = inject(ViewAnnotateService);
  private readonly delta = 10;

  protected zoomIn() {
    this.docSevice.zoom.update(value => value + this.delta);
  }

  protected zoomOut() {
    this.docSevice.zoom.update(value => value - this.delta);
  }
}
