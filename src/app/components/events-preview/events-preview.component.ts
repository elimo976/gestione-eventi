import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import gsap from 'gsap';
import { EventRotationService } from '../../services/event-rotation.service';

@Component({
  selector: 'app-events-preview',
  templateUrl: './events-preview.component.html',
  styleUrls: ['./events-preview.component.scss']
})
export class EventsPreviewComponent implements OnInit {
  @Input() images!: string[];
  @Input() index!: number;  // Indice dell'anteprima corrente

  currentImageIndex: number = 0;
  currentImage: string = '';

  @ViewChild('eventImage') eventImage!: ElementRef<HTMLImageElement>;

  constructor(private rotationService: EventRotationService) {}

  ngOnInit(): void {
    if (this.images && this.images.length > 0) {
      this.currentImage = this.images[this.currentImageIndex];

      // Iscriviti al servizio di rotazione per sapere quando questa anteprima deve girare
      this.rotationService.activeIndex$.subscribe((activeIndex: number) => {
        if (activeIndex === this.index) {
          this.startImageRotation();
        }
      });
    }
  }

  startImageRotation(): void {
    const nextImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.changeImage(nextImageIndex);
  }

  changeImage(nextImageIndex: number): void {
    const currentImageElement = this.eventImage.nativeElement;

    // Effetto di rotazione utilizzando GSAP
    gsap.to(currentImageElement, {
      rotateY: 180,
      opacity: 0,
      duration: 1,
      onComplete: () => {
        this.currentImageIndex = nextImageIndex;
        this.currentImage = this.images[this.currentImageIndex];

        // Prepara il nuovo elemento immagine
        gsap.set(currentImageElement, { rotateY: -180, opacity: 0 });

        // Riporta l'immagine nella posizione iniziale e ripristina l'opacità
        gsap.to(currentImageElement, {
          rotateY: 0,
          opacity: 1,
          duration: 1,
        });
      }
    });
  }
}
