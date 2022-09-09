import { createSlice, createAsyncThunk, createSelector, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './app/store';
import { dateToString, formatAmount, calc } from './util/calculations';
import { captureException } from '@sentry/react-native';
import { _FIREBASE_FUNCTION_URL } from '@env';

export interface AmortizationDetail {
    date: string;
    principal: string;
    interest: string;
    remainingBalance: string;
    totalPrincipal: string;
    totalInterest: string;
};

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
    savingLoan: boolean;
    saveLoanSuccess: boolean;
    saveLoanError: boolean;
};

const initialState: LoanState = {
    homePrice: '350,000',
    downPayment: '35,000',
    loanTerm: 30,
    interestRate: 5.75,
    propertyTax: '315',
    homeInsurance: '175',
    privateMortgageInsurance: '0',
    hoaFees: '0',
    startDate: dateToString(new Date()),
    savingLoan: false,
    saveLoanSuccess: false,
    saveLoanError: false
};

interface Loan {
    name: string;
    email: string;
    homePrice: string;
    downPayment: string;
    loanTerm: number;
    interestRate: number;
    propertyTax: string;
    homeInsurance: string;
    privateMortgageInsurance: string;
    hoaFees: string;
    startDate: string;
    payoffDate: string;
    mortgagePayment: string;
    monthlyPayment: string;
    loanAmount: string;
    loanCost: string;
    totalInterest: string;
};

export const saveLoan = createAsyncThunk('loans/saveLoan',
async (loan: Loan, { rejectWithValue }) => {
    const headers = {
        'Accept': 'application/json, text/plain; charset=utf-8',
        'Content-Type': 'application/json'
    };
    const response = await fetch(`${_FIREBASE_FUNCTION_URL}/loans`, {
        method: 'POST',
        body: JSON.stringify(loan),
        headers
    });
    if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
    }
    const errResponse = await response.text();
    captureException(errResponse);
    return rejectWithValue(errResponse);
});

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
            state.savingLoan = false;
            state.saveLoanSuccess = false;
            state.saveLoanError = false;
            return state;
        },
        clearStatusUpdates: (state: LoanState) => {
            state.savingLoan = false;
            state.saveLoanSuccess = false;
            state.saveLoanError = false;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(saveLoan.pending, (state: LoanState) => {
            state.savingLoan = true;
            state.saveLoanSuccess = false;
            state.saveLoanError = false;
        })
        builder.addCase(saveLoan.fulfilled, (state: LoanState) => {
            state.savingLoan = false;
            state.saveLoanSuccess = true;
            state.saveLoanError = false;
        })
        builder.addCase(saveLoan.rejected, (state: LoanState, { payload }: { payload: any }) => {
            state.savingLoan = false;
            state.saveLoanSuccess = false;
            state.saveLoanError = payload;
        })
    }
});

export const { setHomePrice, setDownPayment, setLoanTerm, setInterestRate, setPropertyTax, 
    setHomeInsurance, setPMI, setHOAFees, setStartDate, reset, clearStatusUpdates } = loansSlice.actions;
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
export const selectSavingLoan = (state: RootState) => state.loans.savingLoan;
export const selectSaveLoanSuccess = (state: RootState) => state.loans.saveLoanSuccess;
export const selectSaveLoanError = (state: RootState) => state.loans.saveLoanError;

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