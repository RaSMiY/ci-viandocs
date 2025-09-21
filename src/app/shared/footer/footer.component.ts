import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Нижняя часть страницы. Отображается, если прокрутить документ до самого низа.
 */
@Component({
  selector: 'ci-footer',
  imports: [],
  templateUrl: 'footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
