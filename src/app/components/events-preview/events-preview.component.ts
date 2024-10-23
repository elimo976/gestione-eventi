import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import gsap from 'gsap';
import { EventRotationService } from '../../services/event-rotation.service';
import { Subscription } from 'rxjs';

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
  isHovered: boolean = false;

  @ViewChild('eventImage') eventImage!: ElementRef<HTMLImageElement>;

  private rotationSubscription!: Subscription;

  constructor(private rotationService: EventRotationService) {}

  ngOnInit(): void {
    if (this.images && this.images.length > 0) {
      this.currentImage = this.images[this.currentImageIndex];

      // Iscrizione al servizio di rotazione per sapere quando questa anteprima deve girare
      this.rotationSubscription = this.rotationService.activeIndex$.subscribe((activeIndex: number) => {
        if (activeIndex === this.index && !this.isHovered) {
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

    // Interrompi animazioni precedenti se esistenti
    gsap.killTweensOf(currentImageElement);

    // Effetto di rotazione utilizzando GSAP
    gsap.to(currentImageElement, {
      rotateY: 180,
      opacity: 0,
      duration: 1,
      onComplete: () => {
        this.currentImageIndex = nextImageIndex;
        this.currentImage = this.images[this.currentImageIndex];

        // Preparazione il nuovo elemento immagine
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

  onMouseEnter() {
    this.isHovered = true;
    this.rotationService.pauseRotation();
    gsap.killTweensOf(this.eventImage.nativeElement); // Ferma l'animazione in corsa
    gsap.set(this.eventImage.nativeElement, { clearProps: "all" }); // Pulisce eventuali proprietà precedenti
  }

  onMouseLeave() {
    this.isHovered = false;
    this.rotationService.resumeRotation();
    this.startImageRotation();
  }

  ngOnDestroy(): void {
    // Cleanup della sottoscrizione
    if (this.rotationSubscription) {
      this.rotationSubscription.unsubscribe();
    }
  }
}
