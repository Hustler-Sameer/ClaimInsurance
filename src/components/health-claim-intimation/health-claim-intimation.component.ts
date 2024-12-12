import { Component, Input } from '@angular/core';
import { PolicyResponse } from '../main-content/main-content.component';

@Component({
  selector: 'app-health-claim-intimation',
  imports: [],
  templateUrl: './health-claim-intimation.component.html',
  styleUrl: './health-claim-intimation.component.css'
})
export class HealthClaimIntimationComponent {
 
  @Input() getResponse : PolicyResponse[] | null = [];
  
  ngOnInit() {
    console.log('Received Health Claim Response: ', this.getResponse);
  }

}
