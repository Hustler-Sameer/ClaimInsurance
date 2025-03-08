// 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MotorClaimIntimationComponent } from '../components/motor-claim-intimation/motor-claim-intimation.component';
import { HealthClaimIntimationComponent } from '../components/health-claim-intimation/health-claim-intimation.component';
import { HealthClaimSubmitComponent } from '../components/health-claim-submit/health-claim-submit.component';
import { RedirectGuard } from './guards/RedirectGuard';
import { DummyPageComponent } from '../components/dummy-page/dummy-page.component';
import { IntimationComponentComponent } from '../components/intimation-component/intimation-component.component';
import { ClaimMisComponent } from '../components/claim-mis/claim-mis.component';


export const routes: Routes = [
    { path: '', component: DummyPageComponent,canActivate:[RedirectGuard]},
    { path: 'health-claim', component: HealthClaimIntimationComponent , canActivate:[RedirectGuard] },
    { path: 'intimation' , component:IntimationComponentComponent,children:[
        {
          path:'health-claim-submit',
          component:HealthClaimSubmitComponent
        },
        {
          path:'motor-claim',
          component:MotorClaimIntimationComponent
        }
      ]
    },
    {path:'claim-mis' , component:ClaimMisComponent , canActivate:[RedirectGuard]},
    { path: 'claim-mis-test', component: ClaimMisComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
