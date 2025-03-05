// 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from '../components/main-content/main-content.component';
import { MotorClaimIntimationComponent } from '../components/motor-claim-intimation/motor-claim-intimation.component';
import { HealthClaimIntimationComponent } from '../components/health-claim-intimation/health-claim-intimation.component';
import { MainOuterComponentComponent } from '../components/main-outer-component/main-outer-component.component';


export const routes: Routes = [
    { path: '', component: MainOuterComponentComponent , children : [
      { path: 'motor-claim', component: MotorClaimIntimationComponent,  },
    { path: 'health-claim', component: HealthClaimIntimationComponent },
    ]}
    
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
