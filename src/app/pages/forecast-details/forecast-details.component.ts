import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast-details.component.html',
  styleUrls: ['./forecast-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastDetailsComponent {

}
