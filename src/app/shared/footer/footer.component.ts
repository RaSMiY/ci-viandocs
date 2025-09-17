import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ci-footer',
  imports: [],
  templateUrl: 'footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent { }
