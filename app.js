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

function Luhn(card) {
  var i, n, c, r, t;
  r = card.split('-').join('');
  // Run through each single digit to create a new string. Even digits
  // are multiplied by two, odd digits are left alone.

  t = "";
  for (i = 0; i < r.length; i++) {
    c = parseInt(r.charAt(i), 10);
    if (i % 2 != 0)
      c *= 2;
    t = t + c;
  }

  // Finally, add up all the single digits in this string.
  n = 0;
  for (i = 0; i < t.length; i++) {
    c = parseInt(t.charAt(i), 10);
    n = n + c;
  }


  if (n != 0 && n % 10 == 0)
    return true;
  else
    return false;
}


var card_issuer = '';

function validator(card) {
  let result = false
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
              card_issuer = obj['Credit Card Issuer']
              result = true;
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
              card_issuer = obj['Credit Card Issuer']
              result = true;
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
  if (res) {
    let rev = n.split("").reverse().join("")
    res = Luhn(rev)
    if (res) {
      console.log(`${card_issuer}`)
    } else {
      console.log('Invalid Card')
    }
  } else {
    console.log('Invalid Card')
  }

  rl.close()
})
