export interface CreditCard {
    id: number;
    cardName: string;
    bankName: string;
    description: string; 
    maxCredit: number;
    active: boolean;
    annualFee: number;
    interestRate: number;
    introOffer: number;
    recommendedCreditScore: string;
    numberOfApplications: number;
    createdDate: string;
    termsAndConditions: string;
  }
  