import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  CLASE_ALERT: string = 'ajs-error-dialog';
  CLASE_SUCCESS: string = 'ajs-success-dialog';

  confirm(title: string, message: string, okCallback: () => any, cancelCallback?: () => any, dialogClass?: string) {
    const cf = alertify
      .confirm()
      .set('movable', false)
      .setting('title', title)
      .setting('message', message)
      .setting('onok', function () {
        okCallback();
      })
      .setting('oncancel', function () {
        if (cancelCallback) {
          cancelCallback();
        }
      })
      .set('labels', { cancel: 'Cancelar' });

    cf.show(true, dialogClass);
  }

  alert(title: string, message: string, dialogClass?: string, okCallback?: () => any) {
    const al = alertify
      .alert()
      .set('movable', false)
      .setting('title', title)
      .setting('message', message)
      .setting('onok', function () {
        if (okCallback) {
          okCallback();
        }
      });

    al.show(true, dialogClass ?? this.CLASE_ALERT);
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }
}
