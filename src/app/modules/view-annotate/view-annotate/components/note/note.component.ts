import { ChangeDetectionStrategy, Component, HostBinding, input, OnInit } from '@angular/core';

@Component({
  selector: 'ci-note',
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent implements OnInit {
  public readonly note = input<PointerEvent>();

  @HostBinding('style.left.px') left = 0;
  @HostBinding('style.top.px') top = 0;

  ngOnInit(): void {
    console.log(this.note());
    const left = this.note()?.layerX;
    const top = this.note()?.layerY;
    this.left = left ? left : 0;
    this.top = top ? top : 0;
  }
}
