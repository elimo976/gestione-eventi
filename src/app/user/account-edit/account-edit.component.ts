import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrl: './account-edit.component.scss'
})
export class AccountEditComponent {
 editForm?: FormGroup;
 userId: string | null | undefined = undefined;
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
 baseUrl = environment.BASE_URL;

 constructor(
  private userService: UserService,
  private route: ActivatedRoute,
  private router: Router,
) {}

 ngOnInit(): void {
  this.initializeForm();

  this.route.params.subscribe(params => {
    this.userId = params['id'];

   // Ottiene i dati dell'utente dal backend
   if (this.userId) {
    this.userService.getUserDetails(this.userId).subscribe((userData) => {
      this.user = userData;

      // Converti il valore di dateOfBirth al formato "yyyy-MM-dd"
    const formattedDateOfBirth = userData.dateOfBirth
    ? new Date(userData.dateOfBirth).toISOString().split('T')[0]
    : '';

      // Popola il form con i dati dell'utente
      this.editForm?.patchValue({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        dateOfBirth: formattedDateOfBirth,
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
    firstName: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
    lastName: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.email]),
    dateOfBirth: new FormControl(''),
    address: new FormGroup({
      street: new FormControl('', [Validators.minLength(5), Validators.maxLength(50)]),
      city: new FormControl('', [Validators.pattern(/^[a-zA-Z\s]+$/), Validators.maxLength(50)]),
      zipCode: new FormControl('', [Validators.pattern(/^\d{5}(-\d{4})?$/)]),
      country: new FormControl('', [Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(3), Validators.maxLength(50)]),
    }),
    phoneNumber: new FormControl('', [Validators.pattern(/\+?[0-9]{7,15}/)]),
    bio: new FormControl('', [Validators.maxLength(500)]),
    avatarUrl: new FormControl(''),
  });
 }

selectAvatar(avatar: string): void {
  this.selectedAvatar = avatar;
  this.editForm!.patchValue({ avatarUrl: avatar }); // Aggiorna il valore del form
}


onSubmit(): void {
  if (!this.userId) {
    console.error('ID utente non definito');
    return; // Termina l'esecuzione della funzione se userId è undefined
  }

  if (this.editForm?.valid) {
    const updatedUser: User = this.editForm.value;

    this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: (response) => {
        console.log('Dati utente aggiornati con successo:', response);
        this.router.navigateByUrl(`user/account-details/${this.userId}`)
      },
      error: (error) => {
        console.error('Errore durante l\'aggiornamento dei dati utente:', error);
        // Azioni aggiuntive per gestire l'errore
      },
    });
  } else {
    console.error('Form non valido');
    // Azioni per evidenziare i campi non validi
  }
}
}
