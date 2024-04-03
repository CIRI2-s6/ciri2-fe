import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';

@Component({
  selector: 'app-ciri2-button',
  standalone: true,
  imports: [CommonModule],
  template: ` <button
    class="rounded hover:bg-opacity-80 transition-all duration-300"
    [ngClass]="
      'bg-' +
      color() +
      ' text-' +
      textColor() +
      ' ' +
      (size() === 'small'
        ? 'px-3 py-2'
        : size() === 'medium'
          ? 'px-4 py-2'
          : 'px-6 py-3')
    "
    [disabled]="disabled()"
    (click)="onClick.emit()"
  >
    {{ text() }}
  </button>`,
  styleUrl: './Ciri2Button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ciri2ButtonComponent {
  color = input.required<'primary' | 'secondary' | 'success' | 'error'>();
  textColor = input<'white' | 'black'>('white');
  text = input.required<string>();
  size = input<'small' | 'medium' | 'large'>('medium');
  disabled = input<boolean>(false);
  onClick = output();
}
