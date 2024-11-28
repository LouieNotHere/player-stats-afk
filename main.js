// generate a background color
function generateBackgroundColor() {
  var hue = Math.floor(Math.random() * 360);
  var sat = Math.floor(Math.random() * 100);
  
  var body = document.querySelector("body");
  body.style.backgroundColor = "hsl(" + hue + ", 100%, 25%)";
}

// logarithm function
function equationVal(x) {
  // for the rebirth bonus
  var s = localStorage.getItem('playerStatsAfk.rebirthMultiplier') || 0;
  var steps = parseInt(s);
  
  var log = Math.log(x) / Math.log(2);
  var stepBonus = 1 + (steps / 100);
  var timeBonus = x / 86400;
  var tinyBonus = x / (Math.PI * 10000);
  var xBonus = x ** 0.25;
  
  return ((log + timeBonus + tinyBonus + xBonus) + 2) * stepBonus;
}

// first function for newbies
function firstFunc() {
  if (!localStorage.getItem('playerStatsAfk.firstVisit')) {
    while (true) {
      let username = prompt("Please enter a username (no spaces allowed):");
      if (!username.includes(' ')) {
        localStorage.setItem('playerStatsAfk.username', username);
        getFirstDate();

        localStorage.setItem('playerStatsAfk.firstVisit', 'true');
        localStorage.setItem('playerStatsAfk.username', username);
        localStorage.setItem('playerStatsAfk.rebirthMultiplier', 1);
        break;
      } else {
        alert("The username provided has spaces. Please try again.");
      }
    }
  }
}

// obtain the username
function getUsername() {
  var name = localStorage.getItem("playerStatsAfk.username");
  
  document.getElementById("name").innerHTML = "Name: " + name;
}

// get the first date
function getFirstDate() {
  const now = new Date();
  const dateStr = now.toLocaleString();

  localStorage.setItem('playerStatsAfk.visitDateTime', dateStr);

  console.log("Date and time saved:", dateStr);
}

// delete all data
function deleteData() {
  // a popup to confirm
  if (confirm("Are you sure? This will reset all data.")) {
    localStorage.removeItem('playerStatsAfk.visitDateTime');
    localStorage.removeItem('playerStatsAfk.username');
    localStorage.removeItem('playerStatsAfk.rebirthMultiplier');
    localStorage.removeItem('playerStatsAfk.firstVisit');
    alert("Data successfully deleted");
    window.location.href = "index.html";
  }
}

// check if the user is eleligible to step ip
function checkEligibility(x) {
  var button = document.getElementById("stepButton");
  if (x >= 25) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

// get the rank
function getRank(x) {
  var firstDate = localStorage.getItem('playerStatsAfk.visitDateTime');
  var fd = new Date(firstDate).getTime();
    
  var present = new Date().getTime();
    
  var t = ((present - fd) / 1000);
    
  var level = equationVal(t);
  
  // all ranks
  var ranks = [
    "Unranked",
    "Rookie",
    "Novice",
    "Beginner",
    "Apprentice",
    "Amateur",
    "Intermediate",
    "Advanced",
    "Professional",
    "Expert",
    "Adept",
    "Veteran",
    "Master",
    "Grandmaster",
    "Champion",
    "Elite",
    "Legend",
    "Virtuoso",
    "Overlord",
    "Titan",
    "Ascendant",
    "Supreme",
    "Immortal"
  ];
  
  if (level > 1000) {
    return ranks[23];
  } else if (level >= 900) {
    return ranks[22];
  } else if (level >= 800) {
    return ranks[21];
  } else if (level >= 750) {
    return ranks[20];
  } else if (level >= 700) {
    return ranks[19];
  } else if (level >= 600) {
    return ranks[18];
  } else if (level >= 500) {
    return ranks[17];
  } else if (level >= 450) {
    return ranks[16];
  } else if (level >= 400) {
    return ranks[15];
  } else if (level >= 350) {
    return ranks[14];
  } else if (level >= 300) {
    return ranks[13];
  } else if (level >= 250) {
    return ranks[12];
  } else if (level >= 225) {
    return ranks[11];
  } else if (level >= 200) {
    return ranks[10];
  } else if (level >= 175) {
    return ranks[9];
  } else if (level >= 150) {
    return ranks[8];
  } else if (level >= 125) {
    return ranks[7];
  } else if (level >= 100) {
    return ranks[6];
  } else if (level >= 75) {
    return ranks[5];
  } else if (level >= 50) {
    return ranks[4];
  } else if (level >= 25) {
    return ranks[3];
  } else if (level >= 10) {
    return ranks[2];
  } else if (level >= 5) {
    return ranks[1];
  } else {
    return ranks[0];
  }
}

// function for rebirth
function doSteps() {
  // variables
  var vD = localStorage.getItem('playerStatsAfk.visitDateTime');
  var fd = new Date(vD).getTime();
  
  var present = new Date().getTime();
  
  var t = ((present - fd) / 1000);
  
  var level = equationVal(t);
  
  if (confirm("Are you sure you want to step up? This will put you back to the beginning, but you will gain more levels than last time.")) {
    var today = new Date().toLocaleString();
    
    localStorage.removeItem('playerStatsAfk.visitDateTime');
    localStorage.removeItem('playerStatsAfk.rebirthMultiplier');
    
    getFirstDate();
    
    localStorage.setItem('playerStatsAfk.visitDateTime', today);
    localStorage.setItem('playerStatsAfk.rebirthMultiplier', level);
    
    window.location.href = "index.html";
  }
}

// change background color for aesthetics
function transitionBackgroundColor() {
  setInterval(generateBackgroundColor, 2000);
}

window.onload = function() {
  // execute this function for the user when they visited the page for the first time
  firstFunc();
  
  generateBackgroundColor();
  getUsername();
  
  setInterval(() => {
    // for the level
    var firstDate = localStorage.getItem('playerStatsAfk.visitDateTime');
    var fd = new Date(firstDate).getTime();
    
    var present = new Date().getTime();
    
    var t = ((present - fd) / 1000);
    
    var level = equationVal(t);
    
    document.getElementById("level").innerHTML = "Level: " + level.toFixed(3);
    
    // for the rank
    document.getElementById("rank").innerHTML = "Rank: " + getRank(Math.trunc(level));
    
    checkEligibility(level);
  });
  
  // transition background for two seconds
  setTimeout(transitionBackgroundColor, 2000);
}