import { Component } from '@angular/core';
import {Message} from "../message";
import {MyHttpClientService} from "../my-http-client.service";

@Component({
  selector: 'app-private-content',
  standalone: true,
  imports: [],
  templateUrl: './private-content.component.html',
  styleUrl: './private-content.component.css'
})
export class PrivateContentComponent {
content: string= ""
  constructor(private http: MyHttpClientService) {
  }
  ngOnInit(): void {
  this.http.getPrivate("/messages").subscribe((data:Message) => {
    this.content  = data.message;
  })
  }
}
