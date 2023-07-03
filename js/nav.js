const navSound = document.getElementById("nav"),

xmbMain = document.getElementById("xmb"),
cols = document.querySelectorAll('.xmb_col');


let sectionNumber = 0,
    subSectionNumber = 0,
    subGotop,
    col;



cols[sectionNumber].classList.add("active");



let moveCol = (hd, ultraHd, fullHd) =>{
    let width = document.body.clientWidth;

    if (width < 1400) {
        xmbMain.style.marginRight = hd;
    }
    else if (width >= 2560 && width <= 3840) {
        xmbMain.style.marginRight = ultraHd;
    }
    else {
        xmbMain.style.marginRight = fullHd;
    };
};

let defineMoveCol = () =>{
    subGotop = false;

    switch (sectionNumber) {
        case 0:
            moveCol('-40%', 0, 0);
            break;
        case 1:
            moveCol('-10%', '18%', '18%');
            subGotop = true;
            break;
        case 2:
            moveCol('22%', '32%', '39%');
            break;
        case 3:
            moveCol('50%', '47%', '60%');
            break;
        case 4:
            moveCol('76%', '62%', '77%');
            break;
        case 5:
            moveCol('100%', '77%', '97%');
            break;
    };
};

let setColActive = (sn, right, left) =>{

    // This line is for the "xmb_col"
    // cols[sn].classList.add("active");

    // This line is for the "xmb_row"
    cols[sn].querySelector('.xmb_row').classList.add("active");

    if(right === true){

        // This line is for the "xmb_col"
        // cols[sn-1].classList.remove("active");

        // This line is for the "xmb_row"
        cols[sn-1].querySelector('.xmb_row').classList.remove("active");
    }
    else if(left === true){

        // This line is for the "xmb_col"
        // cols[sn+1].classList.remove("active");

        // This line is for the "xmb_row"
        cols[sn+1].querySelector('.xmb_row').classList.remove("active");
    };
    // defineMoveCol();
};

/* let focusSubMenu = (sn, sub, down, up) =>{
    switch(sub){
        case 0:
            if(up){
                submenu[sub+1][sn].classList.remove("active")
                submenu[sub][sn].classList.remove("inactive")
            }
            break
        case 1:
            if(down){
                submenu[sub-1][sn].classList.add("inactive")
                submenu[sub][sn].classList.add("active")
            }
            else if(up){
                if(multiSection){
                    submenu[sub+1][sn-1].classList.remove("active")
                    submenu[sub-1][sn].classList.remove("gotop")
                    submenu[sub][sn].classList.add("active")
                }
            }
        case 2:
            if(down){
                if (multiSection) {
                    submenu[sub-2][sn].classList.add("gotop")
                    submenu[sub-1][sn].classList.remove("active")
                    submenu[sub][sn - 1].classList.add("active")
                }
            }
            break
        default:
            break
    }
} */

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
        setColActive(sectionNumber, true, false);
        
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
        setColActive(sectionNumber, false, true);
    }
/*
    else if(e.key === 'ArrowDown'){
        navSound.play()
        e.preventDefault()
        subsection++
        if(subsection < 0){
            subsection = 0
        }
        else if (subsection > 2){
            subsection = 2
        }
        focusSubMenu(sectionNumber, subsection, true, false)
    }

    else if(e.key === 'ArrowUp'){
        navSound.play()
        e.preventDefault()
        subsection--
        if (subsection < 0) {
            subsection = 0
        }
        else if (subsection > 2) {
            subsection = 2
        }
        focusSubMenu(sectionNumber, subsection, false, true)
    } */
});