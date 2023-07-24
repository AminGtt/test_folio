cols[sectionNumber].classList.add("active");
cols[sectionNumber].querySelector('.xmb_col_title').classList.add("active");

let playNavSound = () => {
    navSound.cloneNode(true).play();
}

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
    
    subSectionTopPos = savedSubSections[sectionNumber] * -110;
    close();
}

let subSectionCheck = () => {
    if(subSection < 0){
        subSection = 0;
    }
    else if (subSection > rows.length-1){
        subSection = rows.length-1;
    };
    close();
}

let hideMainInfo = () => {
    maininfo = document.getElementById("maininfo")

    if (!document.getElementById("welcomeTile").classList.contains("focus")) {
        maininfo.style.opacity = 0
    } else if (document.getElementById("welcomeTile").classList.contains("focus")) {
        setTimeout(() => {
            maininfo.style.opacity = 1
        }, 500);
    }
}

let moveCol = (rightKey, leftKey) =>{

    rows = cols[sectionNumber].querySelector('.xmb_row').querySelectorAll('.xmb_row_content');
    

    // sn is a var created only here to "bypass" the fact that 'sectionNumber' var is 
    // already changed when this function is called

    if (rightKey && sn < cols.length) {
        sn++;         
        menuLeftPos = menuLeftPos - 10;
        xmbMain.style.left = menuLeftPos+'%';
    }

    else if (leftKey && sn > 1) {
        sn--;
        menuLeftPos = menuLeftPos + 10;
        xmbMain.style.left = menuLeftPos+'%';
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

let focusSubMenu = (downKey, upKey, rightKey, leftKey) =>{

    // save the last subsec in a section when changing
    savedSubSections[sectionNumber] = subSection;

    rows[subSection].classList.add('focus');

    if (downKey) {
        rows[subSection-1].classList.remove('focus');
    } 
    else 
    if (upKey) {
        rows[subSection+1].classList.remove('focus');
    } else  
    if (rightKey && cols[sectionNumber-1].getElementsByClassName('focus')[0]) {
        cols[sectionNumber-1].getElementsByClassName('focus')[0].classList.remove('focus')
    } else  
    if (leftKey && cols[sectionNumber+1].getElementsByClassName('focus')[0]) {
        cols[sectionNumber+1].getElementsByClassName('focus')[0].classList.remove('focus')
    }

};

let setInfos = () => {
    infos = cols[sectionNumber].querySelectorAll(".infowrapper");
    info = infos[subSection];
};

let displayInfos = () => {
    setInfos();
    if(info) {
        info.style.opacity = 1;
    }
}

let removeInfos  = () => {
    if(info) {
        info.style.opacity = 0;
    }
}

let open = () => {

    // redefine vars on each call to validate the current state
    welcomer = document.getElementById("welcomer")

    if(welcomer){
        goNextStep = true;
    } 
    else if (window.getComputedStyle(menu).getPropertyValue('opacity') == 1) {

        focus = cols[sectionNumber].getElementsByClassName("focus")[0]

        if (focus) {
            if (focus.classList.contains("settings")) {

                //function here
                if (rows[subSection]) {
                    rows[subSection].classList.remove('focus');
                }
                settingswrapper.style.opacity = 1;
    
            } 
    
            else if(focus.classList.contains("infos")){
                displayInfos()
            } 
    
            else if(focus.classList.contains("social")){
    
                // get the link & open in new tab
    
                let href = focus.querySelector('a').getAttribute('href');
                window.open(href, "_blank");
            }
        }

    }
}

let close = () => {

    if (window.getComputedStyle(menu).getPropertyValue('opacity') == 1) {

        focus = cols[sectionNumber].getElementsByClassName("focus")[0]

        if(window.getComputedStyle(settingswrapper).getPropertyValue('opacity') == 1) { // equivalent of the "open( if settings)" 
            rows[subSection].classList.add('focus');
            settingswrapper.style.opacity = 0;
        } else {
            removeInfos()
        }

    }
}

let right  = () => {
    sectionNumber++;
    sectionCheck();
    setColActive(true, false);
    focusSubMenu(false, false, true, false);
}

let left  = () => {
    sectionNumber--;
    sectionCheck();              
    setColActive(false, true);
    focusSubMenu(false, false, false, true);
}

let down  = () => {
    if(subSection < rows.length - 1) {
        subSectionTopPos = subSectionTopPos - 110;
        cols[sectionNumber].querySelector('.xmb_row').style.top = subSectionTopPos+'px';
        rows[subSection].style.top = -220+'px';
    }

    subSection++;
    
    subSectionCheck();
    focusSubMenu(true, false, false, false);
    hideMainInfo();
}

let up  = () => {
    if(subSection > 0) {
        subSectionTopPos = subSectionTopPos +  110;
        cols[sectionNumber].querySelector('.xmb_row').style.top = subSectionTopPos+'px';
        rows[subSection-1].style.top = 0+'px';
    }
    
    subSection--;
    
    subSectionCheck();
    focusSubMenu(false, true, false, false);
    hideMainInfo();
}

colorSelector.addEventListener("change", (e) => {
    e.preventDefault;
    let colorParsed = colorSelector.value.split(',').map(Number)
    drawParams.backgroundColor = colorParsed
})

particlesSelector.addEventListener("change", (e) => {
    e.preventDefault;
    let opac = 1;

    if(particlesSelector.checked) {
        opac = 1;
    } else if (!particlesSelector.checked) {
        opac = 0;
    }

    drawParams.particleOpacity = opac;
})

brightnessSelector.addEventListener("change", (e) => {
    e.preventDefault;
    drawParams.brightness = brightnessSelector.value;
})

document.body.addEventListener('keydown', (e) =>{

    let keyboardIcons = document.querySelectorAll('.details_icon'),
        controllerIcons = document.querySelectorAll(".xbox_key_icon");

    keyboardIcons.forEach(icon => {
        icon.style.opacity = 1;
    })

    controllerIcons.forEach(icon => {
        icon.style.opacity = 0;
    })

    if(e.key === 'ArrowRight'){
        playNavSound();
        e.preventDefault();
          
        right();
    }

    else if(e.key === 'ArrowLeft'){
        playNavSound();
        e.preventDefault();
        
        left();
    }

    else if(e.key === 'ArrowDown'){
        playNavSound();
        e.preventDefault();

        down();
    }

    else if(e.key === 'ArrowUp'){
        playNavSound();
        e.preventDefault();

        up();
    }

    else if(e.key === 'Enter'){
        playNavSound();
        e.preventDefault();
        
        open();
    }

    else if(e.key === 'Escape'){
        playNavSound();
        e.preventDefault();
        
        close();
    }
});