import { Component } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {LoginFormComponent} from "./login-form/login-form.component";
import {PublicContentComponent} from "./public-content/public-content.component";
import {PrivateContentComponent} from "./private-content/private-content.component";
import {NgIf} from "@angular/common";
import {MyHttpClientService} from "./my-http-client.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginFormComponent, PublicContentComponent, PrivateContentComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  componentToShow: string = "public"


  constructor(private http: MyHttpClientService,private route: ActivatedRoute ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params["code"] != undefined) {
        this.http.getToken(params["code"]).subscribe(result => {
          if(result == true){
            this.componentToShow = "private";
          } else {
            this.componentToShow = "public";
          }
        })
      }
    })
  }
}
