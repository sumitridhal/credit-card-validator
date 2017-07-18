# credit-card-validator

## The Luhn Formula:
1. Drop the last digit from the number. The last digit is what we want to check against
2. Reverse the numbers
3. Multiply the digits in odd positions (1, 3, 5, etc.) by 2 and subtract 9 to all any result higher than 9
4. Add all the numbers together
5. The check digit (the last number of the card) is the amount that you would need to add to get a multiple of 10 (Modulo 10)

## List of credit card number formats

|Credit Card Issuer | Starts With ( IIN Range ) | Length ( Number of digits )|
|-------------------|---------------------------|----------------------------|
|American Express|34, 37|15|
|Diners Club - Carte Blanche|300, 301, 302, 303, 304, 305|14|
|Diners Club - International|36|14|
|Diners Club - USA & Canada|54|16|
|Discover|6011, 622126-622925, 644, 645, 646, 647, 648, 649, 65|16,19|
|InstaPayment|637, 638, 639|16|
|JCB|3528-3589|16,19|
|Maestro|5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763|16,19|
|MasterCard|51, 52, 53, 54, 55, 222100-272099|16|
|Visa|4|13,16,19|
|Visa Electron|4026, 417500, 4508, 4844, 4913, 4917|16|
