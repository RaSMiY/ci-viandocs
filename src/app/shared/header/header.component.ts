import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ViewAnnotateService } from '../../modules/view-annotate/view-annotate/view-annotate.service';

/**
 * Верхняя часть страницы. Отображается всегда.
 * Содержит ссылки на страницу автора, на репозиторий на Github'е, текущий масштаб, кнопки увеличения, уменьшения
 * и кнопку сохранить, выводящую в консоль список созданных заметок в документе.
 */
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
    this.docSevice.zoom.update((value) => value + this.delta);
  }

  protected zoomOut() {
    this.docSevice.zoom.update((value) => value - this.delta);
  }

  protected save() {
    this.docSevice.saveNotes();
  }
}
