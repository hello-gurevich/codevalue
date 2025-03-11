import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class HttpService {
  private httpClient = inject(HttpClient);
}
