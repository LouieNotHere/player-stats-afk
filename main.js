// generate the color for the main ui
function generateHue() {
  return Math.floor(Math.random() * 360);
}

function generateColorUi() {
  var hue = generateHue();
  
  // get the tags
  var body = document.querySelector("body");
  
  // texts
  var name = document.querySelector("#name");
  var rank = document.querySelector("#rank");
  var level = document.querySelector("#level");
  var title = document.querySelector("#title");
  var step = document.querySelector("#step");
  var req = document.querySelector("#requirement");
  var cre = document.querySelector("#creator");
  var ver = document.querySelector("#version");
  
  // for the button
  var button = document.querySelector("#stepButton");
  
  body.style.backgroundColor = "hsl(" + hue + ", 100%, 25%)";
  
  // text ids
  name.style.color = "hsl(" + hue + ", 100%, 75%)";
  rank.style.color = "hsl(" + hue + ", 100%, 75%)";
  level.style.color = "hsl(" + hue + ", 100%, 75%)";
  title.style.color = "hsl(" + hue + ", 100%, 75%)";
  step.style.color = "hsl(" + hue + ", 100%, 75%)";
  req.style.color = "hsl(" + hue + ", 100%, 75%)";
  cre.style.color = "hsl(" + hue + ", 100%, 75%)";
  ver.style.color = "hsl(" + hue + ", 100%, 75%)";
  
  // button
  button.style.backgroundColor = "hsl(" + hue + ", 100%, 10%)";
  button.style.shadowBox  = "hsl(" + hue + ", 100%, 10%)";
}

// logarithmic function
function equationVal(x) {
  // for the rebirth bonus
  var s = localStorage.getItem('playerStatsAfk.rebirthMultiplier') || 0;
  var steps = parseInt(s);
  
  var log = Math.log(x) / Math.log(2);
  var stepMulti = 1 + (steps / 100);
  var timeBonus = x / 86400;
  var tinyBonus = x / (Math.PI * 10000);
  var stepBonus = tinyBonus * (1 + (Math.min(log, steps) / 1.28));
  var xBonus = (x + stepBonus) ** 0.3;
  
  return (((log + timeBonus + tinyBonus + xBonus + stepBonus) + 2) * (stepMulti * (1 + (Math.PI / 10)))) + (Math.min(log, steps) / 1.876);
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

// check if the user is eleligible to step up
function checkEligibility(x) {
  const button = document.getElementById("stepButton");
  if (x >= 20) {
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
    "Trainee",
    "Novice",
    "Newbie",
    "Beginner",
    "Learner",
    "Apprentice",
    "Rookie",
    "Amateur",
    "Initiate",
    "Student",
    "Cadet",
    "Junior",
    "Aspirant",
    "Recruit",
    "Neophyte",
    "Intermediate",
    "Skilled",
    "Advanced",
    "Practitioner",
    "Proficient",
    "Journeyman",
    "Competent",
    "Pro",
    "Expert",
    "Specialist",
    "Adept",
    "Veteran",
    "Professional",
    "Elite",
    "Master",
    "Grandmaster",
    "Champion",
    "Hero",
    "Virtuoso",
    "Legend",
    "Paragon",
    "Overlord",
    "Savant",
    "Titan",
    "Visionary",
    "Ascendant",
    "Supreme",
    "Immortal",
    "Deity",
    "Mythic",
    "Transcendent",
    "Ethereal",
    "Celestial",
    "Omniscient",
    "Omnipotent"
  ]; 
  
  if (level >= 20000) {
    return ranks[49];
  } else if (level >= 15000) {
    return ranks[48];
  } else if (level >= 12500) {
    return ranks[47];
  } else if (level >= 10000) {
    return ranks[46];
  } else if (level >= 9000) {
    return ranks[45];
  } else if (level >= 8000) {
    return ranks[44];
  } else if (level >= 7500) {
    return ranks[43];
  } else if (level >= 7000) {
    return ranks[42];
  } else if (level >= 6500) {
    return ranks[41];
  } else if (level >= 6000) {
    return ranks[40];
  } else if (level >= 5500) {
    return ranks[39];
  } else if (level >= 5000) {
    return ranks[38];
  } else if (level >= 4500) {
    return ranks[37];
  } else if (level >= 4000) {
    return ranks[36];
  } else if (level >= 3500) {
    return ranks[35];
  } else if (level >= 3000) {
    return ranks[34];
  } else if (level >= 2750) {
    return ranks[33];
  } else if (level >= 2500) {
    return ranks[32];
  } else if (level >= 2250) {
    return ranks[31];
  } else if (level >= 2000) {
    return ranks[30];
  } else if (level >= 1750) {
    return ranks[29];
  } else if (level >= 1500) {
    return ranks[28];
  } else if (level >= 1400) {
    return ranks[27];
  } else if (level >= 1300) {
    return ranks[26];
  } else if (level >= 1200) {
    return ranks[25];
  } else if (level >= 1100) {
    return ranks[24];
  } else if (level >= 1000) {
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
    // check if the bonus is more than the last one
    var sp = localStorage.getItem('playerStatsAfk.rebirthMultiplier') || 0;
    var steps = parseInt(sp);
    
    var difference = steps - level;
    
    if (level > steps) {
      var today = new Date().toLocaleString();
      
      localStorage.removeItem('playerStatsAfk.visitDateTime');
      localStorage.removeItem('playerStatsAfk.rebirthMultiplier');
      
      getFirstDate();
      
      localStorage.setItem('playerStatsAfk.visitDateTime', today);
      localStorage.setItem('playerStatsAfk.rebirthMultiplier', level);
      
      window.location.href = "index.html";
    } else {
      alert("Cannot proceed: Not enough steps! Left: " + difference.toFixed(3));
      console.error("Cannot proceed: Not enough steps! Left: " + difference.toFixed(3));
    }
  } else {
    alert("Cannot proceed: User cancelled the process");
    console.error("Cannot proceed: User cancelled the process");
  }
}

// change background color for aesthetics
function transitionColorUi() {
  setInterval(generateColorUi, 2000);
}

window.onload = function() {
  // execute this function for the user when they visited the page for the first time
  firstFunc();
  
  generateColorUi();
  getUsername();
  
  setInterval(() => {
    var fd = localStorage.getItem('playerStatsAfk.visitDateTime');
    var fdt = new Date(fd).getTime();
    
    var p = new Date().getTime();
    
    var ft = ((p - fdt) / 1000);
    
    var l = equationVal(ft);

    // if the level value is bigger than 100,000
    if (l >= 100000000) {
      document.getElementById("level").innerHTML = "Level: " + l.toExponential(4);
    } else if (l >= 10000000) {
      document.getElementById("level").innerHTML = "Level: " + Math.trunc(l);
    } else if (l >= 1000000) {
      document.getElementById("level").innerHTML = "Level: " + l.toFixed(1);
    } else if (l >= 100000) {
      document.getElementById("level").innerHTML = "Level: " + l.toFixed(2);
    } else {
      document.getElementById("level").innerHTML = "Level: " + l.toFixed(3);
    } 
    
    document.getElementById("level").innerHTML = "Level: " + l.toFixed(3);
    
    // for the rank
    document.getElementById("rank").innerHTML = "Rank: " + getRank(Math.trunc(l));
    
    checkEligibility(l);
  });
  
  // transition background for two seconds
  setTimeout(transitionColorUi, 2000);
}
