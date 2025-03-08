import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { RedirectionService } from '../../services/Redirection.service';
import { LoaderService } from '../../services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intimation-component',
  imports: [MatProgressSpinnerModule,HeaderComponent,RouterOutlet,CommonModule],
  templateUrl: './intimation-component.component.html',
  styleUrl: './intimation-component.component.css'
})
export class IntimationComponentComponent implements OnInit {

  theme:string="";
  isLoading = false;

  ngOnInit(): void {
      this.redirectionService.getSource().subscribe((source:string) => {
        this.theme = source;
      });

      if(this.theme.toLocaleLowerCase() == "simba") {
        this.renderer.addClass(document.body, 'simba-portal');
        this.renderer.removeClass(document.body, 'customer-portal');
      } else if(this.theme == "customerportal"){
        this.renderer.addClass(document.body, 'customer-portal');
        this.renderer.removeClass(document.body, 'simba-portal');
      }
      
  }

  constructor(
    private redirectionService : RedirectionService,
    private renderer: Renderer2,
    private loaderService:LoaderService
  ) {
    this.loaderService.spinner$.subscribe((data: boolean) => {
      this.isLoading = data;
    });

  }

}
