#!/bin/sh

DaySuffix() {       
    case `date +%d` in    
        1|21|31) echo "st";;
        2|22)    echo "nd";;    
        3|23)    echo "rd";;
        *)       echo "th";;
    esac                   
}

oldDate=`head -n 1 README.md`               
newDate=`date "+    updated on: %d\`DaySuffix\` %B %Y"`
lastLine='<!-- '`date "+%d/%m/%y"`' -->'

sed -i "1s/.*/$newDate/" README.md 
echo Date Updated
sed -i "$ d" README.md 
echo $lastLine >> README.md

