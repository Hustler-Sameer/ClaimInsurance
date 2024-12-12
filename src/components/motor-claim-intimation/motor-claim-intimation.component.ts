import { Component, Input } from '@angular/core';
import { PolicyResponse } from '../main-content/main-content.component';

@Component({
  selector: 'app-motor-claim-intimation',
  imports: [],
  templateUrl: './motor-claim-intimation.component.html',
  styleUrl: './motor-claim-intimation.component.css'
})
export class MotorClaimIntimationComponent {

 @Input() getResponse : PolicyResponse[] | null = [];
 ngOnInit() {
  console.log('Received Health Claim Response: ', this.getResponse);
}
}
