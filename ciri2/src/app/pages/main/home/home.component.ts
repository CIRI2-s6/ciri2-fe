import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: `./home.component.html`,
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(private http: HttpClient, private notifier: NotifierService) {}

  response = signal<Object | null>(null);

  sendRequest() {
    this.http
      .get('http://localhost:8080/components/65f86079ab895ac6a6fe0952')
      .subscribe(
        (response) => {
          console.log(response);
          this.response.set(JSON.stringify(response));
          this.notifier.notify('success', 'Request successful!');
        },
        (error) => {
          console.log(error);
          this.response.set(JSON.stringify(error));
          this.notifier.notify('error', 'Request failed!');
        }
      );
  }
}
