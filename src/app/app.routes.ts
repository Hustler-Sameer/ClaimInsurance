// 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from '../components/main-content/main-content.component';
import { MotorClaimIntimationComponent } from '../components/motor-claim-intimation/motor-claim-intimation.component';
import { HealthClaimIntimationComponent } from '../components/health-claim-intimation/health-claim-intimation.component';
import { HealthClaimSubmitComponent } from '../components/health-claim-submit/health-claim-submit.component';
import { MainOuterComponentComponent } from '../components/main-outer-component/main-outer-component.component';


export const routes: Routes = [
    { path: '', component: MainOuterComponentComponent , children : [
      { path: 'motor-claim', component: MotorClaimIntimationComponent },
    { path: 'health-claim', component: HealthClaimIntimationComponent },
    { path: 'health-claim-submit', component: HealthClaimSubmitComponent },
    ]}
    
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
