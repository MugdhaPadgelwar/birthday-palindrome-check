var dobInput = document.querySelector("#dob-input");
var checkBtn = document.querySelector("#check-btn");
var output = document.querySelector("#output");

checkBtn.addEventListener("click", clickHandler);

function clickHandler() {
  var birthDate = dobInput.value;

  if (birthDate !== "") {
    var listOfBirthDate = birthDate.split("-");

    var date = {
      day: Number(listOfBirthDate[2]),
      month: Number(listOfBirthDate[1]),
      year: Number(listOfBirthDate[0]),
    };

    var isPalindrome = checkPalindromeForAllDateFormats(date);

    if (isPalindrome) {
      
      output.innerText = "🎁🎁 Hurray!! Your birthday is a palindrome.";
    } else {
      var [nextCtr, nextDate] = getNextPalindromeDate(date);
      var [previousCtr, previousDate] = getPreviousPalindromeDate(date);

      if (previousCtr < nextCtr) {
        output.innerText =
          "The nearest pallindrome date is " +
          previousDate.day +
          "-" +
          previousDate.month +
          " - " +
          previousDate.year +
          ", you missed it by " +
          previousCtr +
          " days!";
      } else {
        output.innerText =
          "The nearest pallindrome date is " +
          nextDate.day +
          "-" +
          nextDate.month +
          " - " +
          nextDate.year +
          ", you missed it by " +
          nextCtr +
          " days!";
      }
    }
  } else {
    output.style.display = "block";
    output.innerText = "Please enter your birthdate!!";
  }
}

function reverseStr(str) {
  var listOfchars = str.split("");
  var reverseListOfChars = listOfchars.reverse();
  var reversedStr = reverseListOfChars.join("");
  return reversedStr;
}

function isPalindrome(str) {
  var reverse = reverseStr(str);
  return str === reverse;
}

function convertDateToString(date) {
  dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}

function getAllTheDateFormats(date) {
  var dateStr = convertDateToString(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  var listOfPalindromes = getAllTheDateFormats(date);
  var flag = false;

  for (var i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);

  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPreviousPalindromeDate(date) {
  var ctr = 0;
  var previousDate = getPreviousDate(date);

  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
    if (isPalindrome) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }
  return [ctr, previousDate];
}
