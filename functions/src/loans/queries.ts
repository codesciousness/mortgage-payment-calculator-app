import * as admin from 'firebase-admin';
import { Request, Response } from 'express';
import escape from 'validator/lib/escape';
import normalizeEmail from 'validator/lib/normalizeEmail';
import { formatAmount } from '../util/calculations';
import { validateName, validateEmail, validateCurrency, validateNumber, validateDate } from '../util/data-validation';
import 'dotenv/config';

export async function saveLoan(req: Request, res: Response) {
    let { name, email, homePrice, downPayment, loanTerm, interestRate, startDate, propertyTax, homeInsurance,
        privateMortgageInsurance, hoaFees, mortgagePayment, monthlyPayment, loanAmount, loanCost, totalInterest,
        payoffDate 
    } = req.body;

    const rawValues = [name, email, homePrice, downPayment, loanTerm, interestRate, propertyTax, homeInsurance,
        privateMortgageInsurance, hoaFees, mortgagePayment, monthlyPayment, loanAmount, loanCost, totalInterest
    ];

    rawValues.forEach(value => {
        if (typeof value === 'string') {
            value = value.trim();
            value = escape(value);
        }
    });

    email = normalizeEmail(email, { gmail_remove_dots: false });
    mortgagePayment = formatAmount(mortgagePayment);
    
    const numStrings = [homePrice, downPayment, propertyTax, homeInsurance, privateMortgageInsurance,
        hoaFees, mortgagePayment, monthlyPayment, loanAmount, loanCost, totalInterest
    ];

    const nums = [loanTerm, interestRate];

    const dates = [startDate, payoffDate];

    const numStringNames = ['home price', 'down payment', 'property tax', 'home insurance', 'PMI', 
        'HOA fees', 'mortgage payment', 'monthly payment', 'loan amount', 'loan cost', 'total interest'
    ];

    const numNames = ['loan term, interest rate'];

    const dateNames = ['start date', 'payoff date'];

    if (!name || !email) {
        return res.status(400).send('Please provide a name and email address.');
    }

    if (!validateName(name)) {
        return res.status(400).send('Invalid name format.');
    }

    if (!validateEmail(email)) {
        return res.status(400).send('Invalid email address.');
    }

    for (const [index, value] of numStrings.entries()) {
        const inputName = numStringNames[index];
        if (!validateCurrency(value)) {
            return res.status(400).send(`Invalid ${inputName} format.`);
        };
    };

    for (const [index, value] of nums.entries()) {
        const inputName = numNames[index];
        if (!validateNumber(value)) {
            return res.status(400).send(`Invalid ${inputName} format.`);
        };
    };

    for (const [index, value] of dates.entries()) {
        const inputName = dateNames[index];
        if (!validateDate(value)) {
            return res.status(400).send(`Invalid ${inputName} format.`);
        };
    };

    const sanitizedAndValidated = { name, email, homePrice, downPayment, loanTerm, interestRate, startDate, propertyTax, homeInsurance,
        privateMortgageInsurance, hoaFees, mortgagePayment, monthlyPayment, loanAmount, loanCost, totalInterest, payoffDate
    };

    let snapShot;
    let existingLoan;
    const timestamp = admin.firestore.Timestamp.now;
    const loanData = { ...sanitizedAndValidated, lastUpdated: timestamp() };
    const newLoan = { ...sanitizedAndValidated, created: timestamp(), lastUpdated: timestamp() };
    const db = admin.firestore();
    const Loans = db.collection('loans');

    try {
        snapShot = await Loans.where('email', '==', email).get();
    }
    catch (err) {
        return handleError(res, err);
    };

    existingLoan = snapShot.docs[0];

    if (snapShot.empty) {
        try {
            const addedLoan = await Loans.add(newLoan);
            return res.send(addedLoan);
        }
        catch (err) {
            return handleError(res, err);
        };
    }
    else {
        const currTime = Date.now();
        const timeIntervalDiffInMin = (currTime - existingLoan.data().lastUpdated.toMillis()) / (1000 * 60);
        if (timeIntervalDiffInMin < 1) {
            return res.status(400).send('Limit exceeded. Please wait 1 minute between loan update requests.');
        }
        try {
            const updatedLoan = await Loans.doc(existingLoan.id).update(loanData);
            return res.send(updatedLoan);
        }
        catch (err) {
            return handleError(res, err);
        };
    }
};

function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
};