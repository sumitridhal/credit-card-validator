"use strict"
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let card_meta = [{
    "Credit Card Issuer": "American Express",
    "prefix": [4, 37],
    "length": [15]
  },
  {
    "Credit Card Issuer": "Diners Club - Carte Blanche",
    "prefix": [300, 301, 302, 303, 304, 305],
    "length": [14]
  },
  {
    "Credit Card Issuer": "Diners Club - International",
    "prefix": [36],
    "length": [14]
  },
  {
    "Credit Card Issuer": "Diners Club - USA & Canada",
    "prefix": [54],
    "length": [16]
  },
  {
    "Credit Card Issuer": "Discover",
    "prefix": [6011, "622126-622925", 644, 645, 646, 647, 648, 649, 65],
    "length": [16, 19]
  },
  {
    "Credit Card Issuer": "InstaPayment",
    "prefix": [637, 638, 639],
    "length": [16]
  },
  {
    "Credit Card Issuer": "JCB",
    "prefix": ["3528-3589"],
    "length": [16, 19]
  },
  {
    "Credit Card Issuer": "Maestro",
    "prefix": [5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763],
    "length": [16, 19]
  },
  {
    "Credit Card Issuer": "MasterCard",
    "prefix": [51, 52, 53, 54, 55, "222100-272099"],
    "length": [16]
  },
  {
    "Credit Card Issuer": "Visa",
    "prefix": [4],
    "length": [13, 16, 19]
  },
  {
    "Credit Card Issuer": "Visa Electron",
    "prefix": [4026, 417500, 4508, 4844, 4913, 4917],
    "length": [16]
  }
]

let abort1 = false,
  abort2 = false,
  abort3 = false,
  abort4 = false;

Number.prototype.between = function(a, b) {
  var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
  return this >= min && this <= max;
};

function validator(card) {
  let result = 'Invalid Card'
  let num = card.split('-').join('');
  let len = num.length;
  for (let key in card_meta) {
    let obj = card_meta[key];
    for (var prop in obj) {
      /************ prefix check ***********/
      if (prop == 'prefix') {
        let objp = obj[prop];
        for (let i in objp) {
          let prefix = objp[i];

          let objl = [...obj['length']];
          if (typeof prefix == 'number') {
            if (num.startsWith(prefix) == true && objl.includes(len)) {
              result = obj['Credit Card Issuer']
              abort2 = true;
              abort3 = true;
              break;
            }
          } else {
            let range = prefix.split('-');
            range = range.map(function(e) {
              return parseInt(e)
            });
            let sdigit = range[0].toString().length;
            let snum = parseInt(num.substring(0, sdigit));
            // let pnum = parseInt(num)
            if (snum.between(range[0], range[1]) == true && objl.includes(len)) {
              result = obj['Credit Card Issuer']
              abort2 = true;
              abort3 = true;
              break;
            }
          }
          if (abort3) {
            break;
          }
        }
      }
      if (abort2) {
        break;
      }
    }
    if (abort1) {
      break;
    }
  }

  return result;
}

rl.question('Enter Credit Card Number(####-####-####-####): ', (n) => {
  let res = validator(n)
  console.log(`${res}`)
  rl.close()
})
