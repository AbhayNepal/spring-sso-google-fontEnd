import { Component } from '@angular/core';
import {Message} from "../message";
import {MyHttpClientService} from "../my-http-client.service";

@Component({
  selector: 'app-public-content',
  standalone: true,
  imports: [],
  templateUrl: './public-content.component.html',
  styleUrl: './public-content.component.css'
})
export class PublicContentComponent {
content:string = ""
  constructor(private http: MyHttpClientService) {
  }
  ngOnInit(): void{
  this.http.get("/public/messages").subscribe((data:Message) => {
    this.content = data.message;
  })
  }
}
