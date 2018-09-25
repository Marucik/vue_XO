function randomizeSymbol () {
  var symbols = []
  var number = Math.random();
  symbols = number < 0.5 ? ['x', 'o'] : ['o', 'x']
  return symbols
}

function checkFields (obj) {
  let x = []
  for (const key in obj) {
  x.push(obj[key].mark)
  }

  let j = 0
  let a = 2

  for (var i = 0; i < 3; i++) {

    if (x[i] == x[i + 3] && x[i + 3] == x[i + 6]) {
      if (x[i] != '') {
      return x[i]; 
      }
    }

    if (x[j] == x[j + 1] && x[j + 1] == x[j + 2]) {
      if (x[j] != '') {
        return x[j]; 
      }    
    }
  
    if (x[a] == x[a + 2] && x[a + 2] == x[a + 4]) {
      if (x[a] != '') {
        return x[a]; 
      } 
    }

    if (x[0] == x[4] && x[4] == x[8])
    {
      if (x[0] != '') {
        return x[0]; 
      } 
    }

    j += 3;
  }
  return false
}

module.exports = {
  randomizeSymbol: randomizeSymbol,
  checkFields: checkFields
}