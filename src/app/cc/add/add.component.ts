import { Component, OnInit } from '@angular/core';
import { CreditCard } from 'src/app/models/cc';
import { CcService } from 'src/app/services/cc.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  private subscription: Subscription | undefined;

  newCC: CreditCard = {
    id: 0,
    cardName: "",
    bankName: "",
    description: "",
    maxCredit: 5000,
    active: true,
    annualFee: 10000,
    interestRate: 12,
    introOffer: 1250,
    recommendedCreditScore: '750-1000',
    numberOfApplications: 5,
    createdDate: new Date().toISOString(),
    termsAndConditions: ""
  };

  constructor(
    private ccService: CcService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  saveCC() {
    if (this.newCC.cardName && this.newCC.bankName) {
      this.subscription = this.ccService.addcc(this.newCC).subscribe({
        next: (data: CreditCard) => {
          this.showSuccessMessage("Credit Card Added Successfully");
          this.router.navigate(['cc']);
        },
        error: (error) => {
          this.showErrorMessage("Error adding credit card: " + error.message);
        }
      });
    }
  }

  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
