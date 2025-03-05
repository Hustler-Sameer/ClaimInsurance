// 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from '../components/main-content/main-content.component';
import { MotorClaimIntimationComponent } from '../components/motor-claim-intimation/motor-claim-intimation.component';
import { HealthClaimIntimationComponent } from '../components/health-claim-intimation/health-claim-intimation.component';
import { HealthClaimSubmitComponent } from '../components/health-claim-submit/health-claim-submit.component';
import { MainOuterComponentComponent } from '../components/main-outer-component/main-outer-component.component';
import { RedirectGuard } from './guards/RedirectGuard';


export const routes: Routes = [
    { path: '', component: MainOuterComponentComponent , children : [
      { path: 'motor-claim', component: MotorClaimIntimationComponent , canActivate:[RedirectGuard] },
    { path: 'health-claim', component: HealthClaimIntimationComponent , canActivate:[RedirectGuard] },
    { path: 'health-claim-submit', component: HealthClaimSubmitComponent , canActivate:[RedirectGuard]},
    ]}
    
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
