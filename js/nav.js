const navSound = document.getElementById("nav"),
    xmbMain = document.getElementById("xmb"),
    cols = document.querySelectorAll('.xmb_col');


let sectionNumber = 0,
    subSection = 0,
    subGotop,
    col,
    left = 29;
    sn = 1,
    rows = cols[sectionNumber].querySelector('.xmb_row').querySelectorAll('.xmb_row_content'),
    savedSubSections = [];


cols[sectionNumber].classList.add("active");
cols[sectionNumber].querySelector('.xmb_col_title').classList.add("active");



let moveCol = (rightKey, leftKey) =>{

    rows = cols[sectionNumber].querySelector('.xmb_row').querySelectorAll('.xmb_row_content');
    subSection = 0;

    // sn is a var created only here to "bypass" the fact that 'sectionNumber' var is 
    // already changed when this function is called

    if (rightKey && sn < cols.length) {
        sn++;         
        left = left - 10;
        xmbMain.style.left = left+'%';
    }

    else if (leftKey && sn > 1) {
        sn--;
        left = left + 10;
        xmbMain.style.left = left+'%';
    };

};

let setColActive = (right, left) =>{

    // add active class to "xmb_col"
    cols[sectionNumber].classList.add("active");

    // add active class to "xmb_row"
    cols[sectionNumber].querySelector('.xmb_row').classList.add("active");

    // add active class to "xmb_col_title" 
    cols[sectionNumber].querySelector('.xmb_col_title').classList.add("active");

    if(right === true){

        // remove active class from "xmb_col"
        cols[sectionNumber-1].classList.remove("active");

        // remove active class from "xmb_row"
        cols[sectionNumber-1].querySelector('.xmb_row').classList.remove("active");

        // remove active class from "xmb_col_title"
        cols[sectionNumber-1].querySelector('.xmb_col_title').classList.remove("active");
    }
    else if(left === true){

        // remove active class from "xmb_col"
        cols[sectionNumber+1].classList.remove("active");

        // remove active class from "xmb_row"
        cols[sectionNumber+1].querySelector('.xmb_row').classList.remove("active");

        // remove active class from "xmb_col_title"
        cols[sectionNumber+1].querySelector('.xmb_col_title').classList.remove("active");
    };
    moveCol(right, left);
};

let focusSubMenu = (downKey, upKey) =>{
    // TODO

    rows[subSection].classList.add('focus');

    if (downKey) {
        rows[subSection-1].classList.remove('focus');
    } 
    else if (upKey) {
        rows[subSection+1].classList.remove('focus');
    }
};

document.body.addEventListener('keydown', (e) =>{
    if(e.key === 'ArrowRight'){
        navSound.play();
        e.preventDefault();
        sectionNumber++;
        if(sectionNumber<0){
            sectionNumber = 0;
        }
        else if(sectionNumber >cols.length-1){
            sectionNumber = cols.length-1;
        }
        setColActive(true, false);
        
    }

    else if(e.key === 'ArrowLeft'){
        navSound.play();
        e.preventDefault();
        sectionNumber--;
        if (sectionNumber < 0) {
            sectionNumber = 0;
        }
        else if (sectionNumber > cols.length-1) {
            sectionNumber = cols.length-1;
        }
        setColActive(false, true);
    }

    else if(e.key === 'ArrowDown'){
        navSound.play();
        e.preventDefault();
        subSection++;
        if(subSection < 0){
            subSection = 0;
        }
        else if (subSection > rows.length-1){
            subSection = rows.length-1;
        };
        focusSubMenu(true, false);
    }

    else if(e.key === 'ArrowUp'){
        navSound.play();
        e.preventDefault();
        subSection--;
        if (subSection < 0) {
            subSection = 0;
        }
        else if (subSection > rows.length-1) {
            subSection = rows.length-1;
        };
        focusSubMenu(false, true);
    }
});