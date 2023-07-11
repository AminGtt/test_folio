const navSound = document.getElementById("nav"),
    xmbMain = document.getElementById("xmb"),
    cols = document.querySelectorAll('.xmb_col');


let sectionNumber = 0,
    subSectionNumber = 0,
    subGotop,
    col,
    left = 29;
    sn = 1;


cols[sectionNumber].classList.add("active");
cols[sectionNumber].querySelector('.xmb_col_title').classList.add("active");



let moveCol = (rightKey, leftKey) =>{

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

    // This line add active class to "xmb_col"
    cols[sectionNumber].classList.add("active");

    // This line add active class to "xmb_row"
    cols[sectionNumber].querySelector('.xmb_row').classList.add("active");

    // This line add active class to "xmb_col_title" 
    cols[sectionNumber].querySelector('.xmb_col_title').classList.add("active");

    if(right === true){

        // This line remove active class from "xmb_col"
        cols[sectionNumber-1].classList.remove("active");

        // This line remove active class from "xmb_row"
        cols[sectionNumber-1].querySelector('.xmb_row').classList.remove("active");

        // This line remove active class from "xmb_col_title"
        cols[sectionNumber-1].querySelector('.xmb_col_title').classList.remove("active");
    }
    else if(left === true){

        // This line remove active class from "xmb_col"
        cols[sectionNumber+1].classList.remove("active");

        // This line remove active class from "xmb_row"
        cols[sectionNumber+1].querySelector('.xmb_row').classList.remove("active");

        // This line remove active class from "xmb_col_title"
        cols[sectionNumber+1].querySelector('.xmb_col_title').classList.remove("active");
    };
    moveCol(right, left);
};

let focusSubMenu = (down, up) =>{
    // TODO
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
        subsection++;
        if(subsection < 0){
            subsection = 0;
        }
        else if (subsection > 2){
            subsection = 2;
        };
        focusSubMenu(true, false);
    }

    else if(e.key === 'ArrowUp'){
        navSound.play();
        e.preventDefault();
        subsection--;
        if (subsection < 0) {
            subsection = 0;
        }
        else if (subsection > 2) {
            subsection = 2;
        };
        focusSubMenu(false, true);
    }
});