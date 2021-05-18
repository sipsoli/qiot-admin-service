import {Inject, Injectable} from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private ws: any;
  private messages: Subject<any>;
  private connectionSubject: Subject<MessageEvent>;

  constructor(
    //@Inject('wsServerUrl') private wsUrl: string
  ) {
    this.initConnection();
  }

  public getMessages(): Subject<any> {
    return this.messages;
  }

  public send(value: string): void {
    this.ws.send(value);
  }

  private initConnection(): void {
    this.messages = new Subject<any>();
    this.connectionSubject = this.wsCreate(environment.wsServerUrl);
    this.ws.onmessage = e => {
      const response = e.data;
      return this.messages.next(response);
    };
    this.ws.onclose = e => console.log('client disconnected ');
  }

  public closeConnection(): void {
    this.ws.close(1000, 'disconnect');
    this.ws = undefined;
  }

  private wsCreate(url): Subject<any> {
    this.ws = new WebSocket(url);
    const observable = new Observable((obs: Observer<string>) => {
      this.ws.onmessage = obs.next.bind(obs);
      this.ws.onerror = obs.error.bind(obs);
      this.ws.onclose = obs.complete.bind(obs);
      return this.ws.close.bind(this.ws);
    });

    const observer = {
      next: (data: object) => {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }

}
