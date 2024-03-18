import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-component-create',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>component-create works!</p>`,
    styleUrl: './component-create.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentCreateComponent { }
