import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CreditCard } from 'src/app/models/cc';
import { CcService } from 'src/app/services/cc.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  CCDetails!: CreditCard;
  CCID!: number;
  isLoading = true;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private ccService: CcService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.CCID = parseInt(this.route.snapshot.paramMap.get("id") || '0');

    if (this.CCID !== 0) {
      this.ccService.getccById(this.CCID)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: CreditCard) => {
            this.CCDetails = data;
            this.isLoading = false;
            this.showSuccessMessage("Credit card loaded successfully");
          },
          error: (error) => {
            this.isLoading = false;
            this.showErrorMessage("Error loading credit card: " + error.message);
            this.router.navigate(['cc']);
          }
        });
    } else {
      this.isLoading = false;
      this.showErrorMessage("Invalid credit card ID");
      this.router.navigate(['cc']);
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}

