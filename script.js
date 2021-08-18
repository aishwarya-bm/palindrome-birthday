let checkBtn = document.getElementById("check");
let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
checkBtn.addEventListener("click", function(){
    let bdayStr = document.getElementById("birthday").value;
    if(!bdayStr)
    {
        alert("Please enter your birthday date!");
        return;
    }
    document.getElementById("output").innerHTML = "";
    document.getElementById("wait").style.display = "block";
    let date = bdayStr.split('-');  
    let isPalindrome = checkIsPalindrome(date);
    if(isPalindrome)
    {
        setTimeout(function(){
            document.getElementById("wait").style.display = "none";
            document.getElementById("output").innerHTML = "<div class='msg'>Hurray! Your birthday date is a palindrome! </div>";
        }, 5000);
        
    }
    else
    {
        let previousPalindrome = getPreviousPalindrome(date);
        let nextPalindrome = getNextPalindrome(date);
        console.log("next p date", nextPalindrome);
        console.log("prev p date", previousPalindrome);
        if(previousPalindrome[0] < nextPalindrome[0])
        {
            setTimeout(function(){
            document.getElementById("wait").style.display = "none";
            document.getElementById("output").innerHTML = "<div class='msg'>The nearest palindrome date is "+ 
            previousPalindrome[1][2]+"-"+previousPalindrome[1][1]+"-"+previousPalindrome[1][0]+", you missed it by "+ previousPalindrome[0]+" days</div>";
            }, 5000);
        }
        else
        {
            setTimeout(function(){
            document.getElementById("wait").style.display = "none";
            document.getElementById("output").innerHTML = "<div class='msg'>The nearest palindrome date is "+ 
            nextPalindrome[1][2]+"-"+nextPalindrome[1][1]+"-"+nextPalindrome[1][0]+", you missed it by "+ nextPalindrome[0]+" days</div>";
            }, 5000);
            
        }
    }
    
});

getAllFormats = date => {
    let y = date[0];
    let m = date[1];
    let d = date[2];

    let f = [];
    f.push(y+m+d);
    f.push(y+d+m);
    f.push(m+d+y);
    f.push(m+y+d);
    f.push(d+m+y);
    f.push(d+y+m);

    return f;
}

checkIsPalindrome = date => {
    let formats = getAllFormats(date);
    for(let i=0;i<formats.length;i++)
    {
        if(formats[i] === formats[i].split("").reverse().join(""))
        {
            return true;
        }
    }
    return false;
}

isLeapYear = y => {
    y = parseInt(y);
    if ((0 === y % 4) && (0 !== y % 100) || (0 === y % 400))
        return true;
    return false;
}

getNextDate = date => {
    let y = parseInt(date[0]);
    let m = parseInt(date[1]);
    let d = parseInt(date[2]);

    if(d === 31 && m === 12)
    {
        d = 1; m = 1; y = y+1;
        return y.toString()+"-"+( m < 10 ? "0" : "") +m.toString()+"-"+ ( d < 10 ? "0" : "") +d.toString();
    }

    if(isLeapYear(y))
    {
        if(m === 2)
        {
            if(d === 29)
            {
                d = 1;
                m = m+1;
            }
            else d = d+1;
        }
        else
        {
            if(d === months[m-1])
            {
                d = 1;
                m = m+1;
            }
            else d = d+1;
        }
    }
    else
    {
        if(d === months[m-1])
            {
                d = 1;
                m = m+1;
            }
            else d = d+1;
    }
    return y.toString()+"-"+( m < 10 ? "0" : "") +m.toString()+"-"+ ( d < 10 ? "0" : "") +d.toString();
}

getPreviousDate = date => {
    let y = parseInt(date[0]);
    let m = parseInt(date[1]);
    let d = parseInt(date[2]);

    if(d === 1 && m === 1)
    {
        d = 31; m = 12; y = y-1;
        return y.toString()+"-"+( m < 10 ? "0" : "") +m.toString()+"-"+ ( d < 10 ? "0" : "") +d.toString()
    }

    if(isLeapYear(y))
    {
        if(m === 3)
        {
            if(d === 1)
            {
                d = 29;
                m = m-1;
            }
            else d = d-1;
        }
        else
        {
            if(d === 1)
            {
                d = months[m-1];
                m = m-1;
            }
            else d = d-1;
        }
    }
    else
    {
        if(d === 1)
            {
                d = months[m-1];
                m = m-1;
            }
            else d = d-1;
    }
    return y.toString()+"-"+( m < 10 ? "0" : "") +m.toString()+"-"+ ( d < 10 ? "0" : "") +d.toString();
}

getNextPalindrome = date => {
    let days = 0;
    while(true)
    {
        let nextDate = getNextDate(date);
        nextDate = nextDate.split('-'); 
        days++;
        if(checkIsPalindrome(nextDate))
        {
            console.log(nextDate)
            return [days,nextDate];
        }
        date = nextDate;
    }
}

getPreviousPalindrome = date => {
    let days = 0;
    while(true)
    {
        let previousDate = getPreviousDate(date);
        previousDate = previousDate.split('-'); 
        days++;
        if(checkIsPalindrome(previousDate))
        {
            console.log(previousDate)
            return [days,previousDate];
        }
        date = previousDate;
    }
}