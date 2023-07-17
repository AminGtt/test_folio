const navSound = document.getElementById("nav"),
    xmbMain = document.getElementById("xmb"),
    cols = document.querySelectorAll('.xmb_col');


let sectionNumber = 0,
    subSection = 0,
    subGotop,
    left = 29;
    sn = 1,
    rows = cols[sectionNumber].querySelector('.xmb_row').querySelectorAll('.xmb_row_content'),
    savedSubSections = [0];


cols[sectionNumber].classList.add("active");
cols[sectionNumber].querySelector('.xmb_col_title').classList.add("active");

let sectionCheck = () => {
    if(sectionNumber < 0){
        sectionNumber = 0;
    }
    else if(sectionNumber > cols.length-1){
        sectionNumber = cols.length-1;
    }
    
    if (savedSubSections[sectionNumber] === undefined) {
        subSection = 0;
        savedSubSections[sectionNumber] = 0;
    } else if (savedSubSections[sectionNumber] !== undefined) {
        subSection = savedSubSections[sectionNumber];
    }
}

let subSectionCheck = () => {
    if(subSection < 0){
        subSection = 0;
    }
    else if (subSection > rows.length-1){
        subSection = rows.length-1;
    };
}

let moveCol = (rightKey, leftKey) =>{

    rows = cols[sectionNumber].querySelector('.xmb_row').querySelectorAll('.xmb_row_content');
    

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

    savedSubSections[sectionNumber] = subSection;

    rows[subSection].classList.add('focus');

    if (downKey) {
        rows[subSection-1].classList.remove('focus');
    } 
    else if (upKey) {
        rows[subSection+1].classList.remove('focus');
    }
};

let playNavSound = () => {
    navSound.cloneNode(true).play();
}

document.body.addEventListener('keydown', (e) =>{
    if(e.key === 'ArrowRight'){
        playNavSound();
        e.preventDefault();
        sectionNumber++;

        sectionCheck();
        setColActive(true, false);
        
    }

    else if(e.key === 'ArrowLeft'){
        playNavSound();
        e.preventDefault();
        sectionNumber--;

        sectionCheck();
        setColActive(false, true);
    }

    else if(e.key === 'ArrowDown'){
        playNavSound();
        e.preventDefault();
        subSection++;
        
        subSectionCheck();
        focusSubMenu(true, false);
    }

    else if(e.key === 'ArrowUp'){
        playNavSound();
        e.preventDefault();
        subSection--;
        
        subSectionCheck();
        focusSubMenu(false, true);
    }

    else if(e.key === 'Enter'){
        playNavSound();
        e.preventDefault();
        
        //todo
    }

    else if(e.key === 'Escape'){
        playNavSound();
        e.preventDefault();
        
        //todo
    }
});