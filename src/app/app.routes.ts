// 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from '../components/main-content/main-content.component';
import { MotorClaimIntimationComponent } from '../components/motor-claim-intimation/motor-claim-intimation.component';
import { HealthClaimIntimationComponent } from '../components/health-claim-intimation/health-claim-intimation.component';
import { HealthClaimSubmitComponent } from '../components/health-claim-submit/health-claim-submit.component';
import { MainOuterComponentComponent } from '../components/main-outer-component/main-outer-component.component';
import { RedirectGuard } from './guards/RedirectGuard';
import { DummyPageComponent } from '../components/dummy-page/dummy-page.component';
import { IntimationComponentComponent } from '../components/intimation-component/intimation-component.component';


export const routes: Routes = [
    // { path: '', component: MainOuterComponentComponent},
    { path: '', component: DummyPageComponent,canActivate:[RedirectGuard]},
    { path: 'dummy-page', component: DummyPageComponent , canActivate:[RedirectGuard]},
    // { path: 'motor-claim', component: MotorClaimIntimationComponent , canActivate:[RedirectGuard] },
    { path: 'health-claim', component: HealthClaimIntimationComponent , canActivate:[RedirectGuard] },
    // { path: 'health-claim-submit', component: HealthClaimSubmitComponent , canActivate:[RedirectGuard]},
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
    }
    
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
