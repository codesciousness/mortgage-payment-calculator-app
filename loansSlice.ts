import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './app/store';
import { dateToString, formatAmount, calc } from './util/calculations';

export interface AmortizationDetail {
    date: string;
    principal: string;
    interest: string;
    remainingBalance: string;
    totalPrincipal: string;
    totalInterest: string;
}

interface LoanState {
    homePrice: string;
    downPayment: string;
    loanTerm: number;
    interestRate: number;
    propertyTax: string;
    homeInsurance: string;
    privateMortgageInsurance: string;
    hoaFees: string;
    startDate: string;
}

const initialState: LoanState = {
    homePrice: '350,000',
    downPayment: '35,000',
    loanTerm: 30,
    interestRate: 5.75,
    propertyTax: '315',
    homeInsurance: '175',
    privateMortgageInsurance: '0',
    hoaFees: '0',
    startDate: dateToString(new Date())
}

const loansSlice = createSlice({
    name: 'loans',
    initialState,
    reducers: {
        setHomePrice: (state: LoanState, action: PayloadAction<string>) => {
            state.homePrice = formatAmount(action.payload);
            return state;
        },
        setDownPayment: (state: LoanState, action: PayloadAction<string>) => {
            state.downPayment = action.payload;
            return state;
        },
        setLoanTerm: (state: LoanState, action: PayloadAction<number>) => {
            state.loanTerm = action.payload;
            return state;
        },
        setInterestRate: (state: LoanState, action: PayloadAction<number>) => {
            state.interestRate = action.payload;
            return state;
        },
        setPropertyTax: (state: LoanState, action: PayloadAction<string>) => {
            state.propertyTax = formatAmount(action.payload);
            return state;
        },
        setHomeInsurance: (state: LoanState, action: PayloadAction<string>) => {
            state.homeInsurance = formatAmount(action.payload);
            return state;
        },
        setPMI: (state: LoanState, action: PayloadAction<string>) => {
            state.privateMortgageInsurance = formatAmount(action.payload);
            return state;
        },
        setHOAFees: (state: LoanState, action: PayloadAction<string>) => {
            state.hoaFees = formatAmount(action.payload);
            return state;
        },
        setStartDate: (state: LoanState, action: PayloadAction<string>) => {
            state.startDate = action.payload;
            return state;
        },
        reset: (state: LoanState) => {
            state.homePrice = '350,000';
            state.downPayment = '35,000';
            state.loanTerm = 30;
            state.interestRate = 5.75;
            state.propertyTax = '315';
            state.homeInsurance = '175';
            state.privateMortgageInsurance = '0';
            state.hoaFees = '0';
            state.startDate = dateToString(new Date());
            return state;
        }
    }
});

export const { setHomePrice, setDownPayment, setLoanTerm, setInterestRate, setPropertyTax, 
    setHomeInsurance, setPMI, setHOAFees, setStartDate, reset } = loansSlice.actions;
export default loansSlice.reducer;

export const selectHomePrice = (state: RootState) => state.loans.homePrice;
export const selectDownPayment = (state: RootState) => state.loans.downPayment;
export const selectLoanTerm = (state: RootState) => state.loans.loanTerm;
export const selectInterestRate = (state: RootState) => state.loans.interestRate;
export const selectPropertyTax = (state: RootState) => state.loans.propertyTax;
export const selectHomeInsurance = (state: RootState) => state.loans.homeInsurance;
export const selectPMI = (state: RootState) => state.loans.privateMortgageInsurance;
export const selectHOAFees = (state: RootState) => state.loans.hoaFees;
export const selectStartDate = (state: RootState) => state.loans.startDate;

export const selectLoanAmount = createSelector(
    selectHomePrice, 
    selectDownPayment, 
    (homePrice, downPayment) => calc.loanAmount(homePrice, downPayment)
);
export const selectMortgagePayment = createSelector(
    selectLoanAmount, 
    selectInterestRate, 
    selectLoanTerm, 
    (loanAmount, interestRate, loanTerm) => calc.mortgagePayment(loanAmount, interestRate, loanTerm)
);
export const selectMonthlyPayment = createSelector(
    selectMortgagePayment, 
    selectPropertyTax,
    selectHomeInsurance,
    selectPMI,
    selectHOAFees, 
    (mortgagePayment, propertyTax, homeInsurance, privateMortgageInsurance, hoaFees) => calc.monthlyPayment(mortgagePayment, propertyTax, homeInsurance, privateMortgageInsurance, hoaFees)
);
export const selectLoanCost = createSelector(
    selectMortgagePayment, 
    selectLoanTerm, 
    (mortgagePayment, loanTerm) => calc.loanCost(mortgagePayment, loanTerm)
);
export const selectTotalInterest = createSelector(
    selectLoanAmount, 
    selectLoanCost, 
    (loanAmount, loanCost) => calc.totalInterest(loanAmount, loanCost)
);
export const selectPayoffDate = createSelector(
    selectStartDate, 
    selectLoanTerm, 
    (startDate, loanTerm) => calc.payoffDate(startDate, loanTerm)
);
export const selectAmortizationSchedule = createSelector(
    selectLoanAmount, 
    selectMortgagePayment,
    selectInterestRate,
    selectLoanTerm,
    selectStartDate, 
    (loanAmount, mortgagePayment, interestRate, loanTerm, startDate) => calc.amortization(loanAmount, mortgagePayment, interestRate, loanTerm, startDate)
);