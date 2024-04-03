import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: ` <div class="flex flex-col justify-center items-center">
    <div class="flex items-center">
      @for (item of steps(); track $index) {
        <div
          class="w-10 h-10 rounded-full  text-white flex items-center justify-center"
          [ngClass]="currentStep() >= $index ? 'bg-primary' : 'bg-gray-400'"
        >
          <mat-icon>{{ item.icon }}</mat-icon>
        </div>
        <div
          *ngIf="$index !== steps().length - 1"
          class="w-16 h-2"
          [ngClass]="currentStep() > $index ? 'bg-primary' : 'bg-gray-300'"
        ></div>
      }
    </div>
    <div class=" flex flex-col justify-center items-center w-full">
      <div class="text-sm font-medium text-gray-500 text-center">
        {{ steps()[currentStep()].name }}
      </div>
      <div class="text-xs text-gray-400 text-center">
        {{ steps()[currentStep()].description }}
      </div>
    </div>
  </div>`,
  styleUrl: './stepper.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent {
  steps =
    input.required<{ name: string; description: string; icon: string }[]>();
  currentStep = input.required<number>();
}
