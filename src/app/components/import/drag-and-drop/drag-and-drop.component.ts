import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import Papa, { ParseResult } from 'papaparse';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ciri2-drag-and-drop',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent {
  fileChanged$ = new Subject<Event>();
  fileString$ = new Subject<string>();
  destroy$ = new Subject<void>();

  @Output() parsedFile = new EventEmitter<unknown[]>();

  ngOnInit(): void {
    this.handleFileChange();
    this.handleParseFile();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleFileChange(): void {
    this.fileChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: Event) => {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
          const file = fileInput.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target) {
              const fileContent = e.target.result as string;
              this.fileString$.next(fileContent);
            }
          };
          reader.readAsText(file);
        }
      });
  }

  handleParseFile(): void {
    this.fileString$.pipe(takeUntil(this.destroy$)).subscribe((fileString) => {
      Papa.parse(fileString, {
        complete: (result: ParseResult<unknown>) => {
          const transformedData = this.transformParsedData(result.data);
          this.parsedFile.emit(transformedData);
        }
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transformParsedData(data: any[]): any[] {
    const columns = data[0];
    const removedColumns: number[] = [];
    for (let index = 0; index < columns.length; index += 1) {
      if (columns[index].includes('[') && columns[index].includes(']')) {
        removedColumns.push(index);
      }
    }

    const transformedData = data.map((row) => {
      const transformedRow = row.filter((column: string, index: number) => {
        return !removedColumns.includes(index);
      });
      return transformedRow;
    });

    return transformedData;
  }
}
