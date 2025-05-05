import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CreditCard } from '../../models/cc';
import { CcService } from '../../services/cc.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  editCreditCardForm!: FormGroup;

  creditCardId: number = 0;

  creditCardData: CreditCard | null = null;

  private destroy$ : Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private creditCardsService: CcService
  ) {
    this.editCreditCardForm = this.formBuilder.group({
      id: [this.creditCardId],
      cardName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      bankName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      annualFee: ['', [Validators.required]],
      interestRate: ['', [Validators.required]],
      maxCredit: ['', [Validators.required]],
      introOffer: [''],
      active: [false, Validators.required],
      recommendedCreditScore: ['', Validators.required],
      numberOfApplications: ['', Validators.required],
      createdDate: ['', Validators.required],
      termsAndConditions: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      updatedDate: ['']
    });
  }

  ngOnInit(){
    const id = parseInt(this.route.snapshot.paramMap.get("id") || '');
    this.creditCardId = id;

    if(id !== 0){
      this.creditCardsService.getccById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: CreditCard) => {
        this.creditCardData = data;
        this.editCreditCardForm.patchValue({
          ...data,
          recommendedCreditScore: data.recommendedCreditScore || '',
          createdDate: data.createdDate ? data.createdDate : '',
          updatedDate: new Date().toISOString()
        });
      });
    }
  }

  onSubmit(){
    if(this.editCreditCardForm.valid){
      const updatedFormData: CreditCard = this.editCreditCardForm.value;
      
      this.creditCardsService.updatecc(this.creditCardId, updatedFormData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(()=> {
        this.showSuccessMessage("Credit Card Updated Successfully");
        this.router.navigate(['/cc']);
      })
    }
  }

  showSuccessMessage(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}