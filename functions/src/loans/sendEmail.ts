import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

const IN_PROD = process.env.NODE_ENV === 'production';

export const sendEmail = (change: functions.Change<functions.firestore.DocumentSnapshot>, context: functions.EventContext) => {
    const data = change.after.data();
    
    if (!data) return;

    const { name, email, homePrice, downPayment, loanTerm, interestRate, startDate, propertyTax, homeInsurance,
        privateMortgageInsurance, hoaFees, mortgagePayment, monthlyPayment, loanAmount, loanCost, totalInterest,
        payoffDate } = data;

    let emailHtml: string = '';

    try {
        emailHtml = fs.readFileSync(path.join(__dirname, '../../email/email.html'), 'utf8');
    }
    catch (err) {
        console.error(err);
    }

    emailHtml = emailHtml.replace('nameVariable', name.split(' ')[0]);
    emailHtml = emailHtml.replace('homePriceVariable', homePrice);
    emailHtml = emailHtml.replace('downPaymentVariable', downPayment);
    emailHtml = emailHtml.replace('interestRateVariable', interestRate);
    emailHtml = emailHtml.replace('loanTermVariable', loanTerm);
    emailHtml = emailHtml.replace('startDateVariable', startDate);
    emailHtml = emailHtml.replace('principalVariable', mortgagePayment);
    emailHtml = emailHtml.replace('propertyTaxVariable', propertyTax);
    emailHtml = emailHtml.replace('homeInsuranceVariable', homeInsurance);
    emailHtml = emailHtml.replace('PMIVariable', privateMortgageInsurance);
    emailHtml = emailHtml.replace('HOAFeesVariable', hoaFees);
    emailHtml = emailHtml.replace('monthlyPaymentVariable', monthlyPayment);
    emailHtml = emailHtml.replace('loanAmountVariable', loanAmount);
    emailHtml = emailHtml.replace('totalInterestVariable', totalInterest);
    emailHtml = emailHtml.replace('loanCostVariable', loanCost);
    emailHtml = emailHtml.replace('payoffDateVariable', payoffDate);

    const plainText = `
    Mortgage Loan Payment Summary
    
    Loan Details

    Hi, ${name.split(' ')[0]}! Here is your requested home loan information.

    Home Price: $${homePrice}
    Down Payment: $${downPayment}
    Interest Rate: ${interestRate}%
    Loan Term: ${loanTerm} Years
    Start Date: ${startDate}

    Monthly Payment Breakdown

    Principal & Interest: $${mortgagePayment}
    Property Tax: $${propertyTax}
    Homeowner's Insurance: $${homeInsurance}
    Private Mortgage Insurance: $${privateMortgageInsurance}
    HOA Fees: $${hoaFees}
    Total Monthly Payment: $${monthlyPayment}

    Loan Totals & Payoff Date

    Loan Amount: $${loanAmount}
    Total Interest Paid: $${totalInterest}
    Total Cost of Loan: $${loanCost}
    Payoff Date: ${payoffDate}
    `;

    async function sendEmail() {
        let mailConfig;
        const testAccount = await nodemailer.createTestAccount();

        if (IN_PROD) {
            mailConfig = {
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN
                }
            } as nodemailer.TransportOptions;
        }
        else {
            mailConfig = {
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                }
            };
        }
    
        const transporter = nodemailer.createTransport(mailConfig);
    
        const emailInfo = await transporter.sendMail({
            from: `"Mortgage Payment Calculator" <${process.env.EMAIL_USERNAME}@gmail.com>`,
            to: `${name} <${email}>`,
            subject: "Mortgage Loan Payment Summary",
            text: plainText,
            html: emailHtml,
            attachments: [
                {
                    filename: 'img1.jpg',
                    path: `${__dirname}/../../email/images/towfiqu-barbhuiya-05XcCfTOzN4-unsplash.jpg`,
                    cid: 'img1'
                },
                {
                    filename: 'img2.jpg',
                    path: `${__dirname}/../../email/images/tierra-mallorca-rgJ1J8SDEAY-unsplash.jpg`,
                    cid: 'img2'
                },
                {
                    filename: 'img3.jpg',
                    path: `${__dirname}/../../email/images/tierra-mallorca-JXI2Ap8dTNc-unsplash.jpg`,
                    cid: 'img3'
                }
            ]
        });
    
        console.log('Message sent: %s', emailInfo.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(emailInfo));
    }
    
    return sendEmail().catch(console.error);
};