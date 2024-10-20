#!/bin/sh

DaySuffix() {       
    case `date +%d` in    
        01|21|31) echo "st";;
        02|22)    echo "nd";;    
        03|23)    echo "rd";;
        *)       echo "th";;
    esac                   
}

oldDate=`head -n 1 README.md`               
newDate=`date "+    updated on: %d\`DaySuffix\` %B %Y, %A"`
lastLine='<!-- '`date "+%d/%m/%y"`' -->'

sed -i "1s/.*/$newDate/" README.md 
echo Date Updated
sed -i "$ d" README.md 
echo $lastLine >> README.md
