'use strict'

const $doc = document;
let $InButtons = $doc.getElementById('In');
let $ZeroButton = $doc.getElementById('Zero');
let $Number = $doc.getElementById('Number');
let $BaseButtons = $doc.getElementById('Bases');

const Nums = [1 , 2 , 5 , 10 , 100];
const Bases = [2 , 8 , 10 , 16 , 65536];
const Line = 5;
let cnt = 0;
let now_base = 10;

function reverse(s){
    return s.split("").reverse().join("");
}

function change_base (num , base) {
    let res = "";
    if(num != 0) {
        while (num > 0) {
            let dight = num%base;
            if(dight >= 10) res += String.fromCharCode(65+dight-10);
            else res += dight;
            num = (num/base|0);
        }
    } else {
        res += '0';
    }
    if(base == 8) res += '0';
    else if (base == 16) res += 'x0';
    return reverse(res)
}

function html_update (cnt , base) {
    let res = change_base(cnt , base);
    $Number.textContent = res;
}

function make_button () {
    let index = 0;
    for(let i of Nums) {
        let $new_button = $doc.createElement('button');
        $new_button.className = "Button";
        $new_button.textContent = `+${i}`;
        $new_button.addEventListener('click' , () => {
            cnt += i;
            html_update(cnt , now_base);
        });
        $InButtons.appendChild($new_button);
        if(index%Line == Line-1) $InButtons.appendChild($doc.createElement('br'));
        index++;
    }
    $ZeroButton.addEventListener('click' , () => {
        cnt = 0;
        now_base = 10;
        html_update(0 , now_base);
    });
    index = 0;
    for(let i of Bases) {
        let $new_button = $doc.createElement('button');
        $new_button.className = "Base";
        $new_button.textContent = i==65536?`beta${i}`:`${i}`;
        $new_button.addEventListener('click' , () => {
            now_base = i;
            html_update(cnt , i);
        });
        $BaseButtons.appendChild($new_button);
        if(index%Line == Line-1) $InButtons.appendChild($doc.createElement('br'));
        index++;
    }
}

function init () {
    make_button();
    html_update(0 , now_base);
}

init();