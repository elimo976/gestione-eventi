import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrl: './account-edit.component.scss'
})
export class AccountEditComponent {
 editForm?: FormGroup;
 userId?: string;
 avatars: string[] = [
  '/avatars/avatar1.png',
  '/avatars/avatar2.png',
  '/avatars/avatar3.png',
  '/avatars/avatar4.png',
  '/avatars/avatar5.png'
 ]
 selectedAvatar: string | null = null;
 user: any;
 avatarUrl: string | null = null; // Per immagazzinare l'URL dell'avatar

 constructor(
  private userService: UserService,
  private route: ActivatedRoute,
) {}

 ngOnInit(): void {
  this.initializeForm();

  this.route.params.subscribe(params => {
    this.userId = params['id'];

    // Carica la lista degli avatar dal backend
    this.userService.getAvatars().subscribe({
      next: (avatars) => {
        this.avatars = avatars;
      },
      error: (error) => {
        console.error('Errore durante il recupero dei avatar:', error);
      }
    })

   // Ottiene i dati dell'utente dal backend
   if (this.userId) {
    this.userService.getUserDetails(this.userId).subscribe((userData) => {
      this.user = userData;

      // Popola il form con i dati dell'utente
      this.editForm?.patchValue(userData);
      this.editForm?.patchValue({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        dateOfBirth: userData.dateOfBirth,
        address: userData.address || { street: '', city: '', zipCode: '', country: '' },
        phoneNumber: userData.phoneNumber,
        bio: userData.bio,
        avatarUrl: userData.avatarUrl,
      });
    })
   }
  })
 }

 private initializeForm(): void {
  this.editForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    dateOfBirth: new FormControl(''),
    address: new FormGroup({
       street: new FormControl(''),
      city: new FormControl(''),
      zipCode: new FormControl(''),
      country: new FormControl(''),
    }),
    phoneNumber: new FormControl('', [Validators.pattern(/\+?[0-9]{7,15}/)]),
    bio: new FormControl(''),
    avatarUrl: new FormControl(''),
  });
 }

 onAvatarSelect(avatar: string): void {
  this.selectedAvatar = avatar;
}

 onSubmit(): void {
  if (this.editForm?.valid) {
    const updatedUser: User = this.editForm?.value;
    this.userService.updateUser('userId', updatedUser).subscribe({
      next: (response) => {
        console.log('Dati utente aggiornati', response);
      },
      error: (error) => {
        console.error('Errore durante l\'aggiornamento dei dati utente', error);
      }
    });
  } else {
    console.error('Form non valido');
  }
 }
}
