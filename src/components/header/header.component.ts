import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from "@angular/common";
import { SourceService } from '../../services/Source.service';
import { RedirectionService } from '../../services/Redirection.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule , MatDividerModule , MatButtonModule , CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  sourceName:any = "";
  isSimba:boolean = false;

  constructor(private redirectService:RedirectionService){

  }
  ngOnInit(): void {
    this.redirectService.getSource().subscribe((source: string) => {
      this.sourceName = source.toLowerCase();
      console.log("source in other component: ", this.sourceName);
      if(this.sourceName == "simba") {
        this.isSimba = true;
      }
    });
  }
  

}
