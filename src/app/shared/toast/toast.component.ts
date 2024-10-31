import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnChanges {
  @Input() message: string = '';
  show: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['message'] && changes['message'].currentValue) {
      this.showToast(changes['message'].currentValue);
    }
  }

  showToast(message: string) {
    this.message = message;
    this.show = true;

    setTimeout(() => {
      this.close();
    }, 5000); // Nascondi dopo 5 secondi
  }

  close() {
    this.show = false;
  }
}
