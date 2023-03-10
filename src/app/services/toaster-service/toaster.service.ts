import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title);
  }

  showFaield(message: string, title: string) {
    this.toastr.error(message, title, {
      timeOut: 4000,
    });
  }
}
