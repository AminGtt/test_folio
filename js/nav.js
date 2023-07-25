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

        focus = menu.getElementsByClassName("focus")[0]

        if (focus) {
               
            if(focus.classList.contains("infos")){ //open infos
                displayInfos()
            } 
    
            else if(focus.classList.contains("social")){ //open social medias
    
                // get the link & open in new tab
    
                let href = focus.querySelector('a').getAttribute('href');
                window.open(href, "_blank");
            } else if (focus.classList.contains("settings")) { // open settingswrapper

                
                if (rows[subSection]) {
                    rows[subSection].classList.remove('focus');
                }
                settingswrapper.style.opacity = 1;

                if (settingswrapper.querySelectorAll('article')[subSection].id == 'themeSettings'){
                    
                    currentLabel = 0;
                    settingswrapper.querySelectorAll('label')[currentLabel].classList.add('focus')

                    //manage opacity
                    themeArticle.style.opacity = 1
                    soundArticle.style.opacity = 0
                    dateArticle.style.opacity = 0

                }
                else if (settingswrapper.querySelectorAll('article')[subSection].id == 'soundSettings'){
                    
                    console.log(currentLabel)

                    settingswrapper.querySelectorAll('article')[subSection].querySelectorAll('p')[currentLabel].classList.add('focus')

                    themeArticle.style.opacity = 0
                    soundArticle.style.opacity = 1
                    dateArticle.style.opacity = 0

                }
                else if (settingswrapper.querySelectorAll('article')[subSection].id == 'dateSettings'){
                    
                    console.log(currentLabel)

                    settingswrapper.querySelectorAll('article')[subSection].querySelectorAll('p')[currentLabel].classList.add('focus')

                    themeArticle.style.opacity = 0
                    soundArticle.style.opacity = 0
                    dateArticle.style.opacity = 1
                }
                
    
            } else if (focus.classList.contains('themeSelector')) { // go deeper in settings


                currentSection = settingswrapper.querySelectorAll("section")[currentLabel]

                wrappers = currentSection.getElementsByClassName('themewrapper')

                if(wrappers[currentWrapper]) {
                    wrappers[currentWrapper].classList.add('focus')
                    focus.classList.remove('focus')
                }


            } else if(focus.classList.contains('themewrapper')) {

                options = currentSection.querySelectorAll('option')

                if(options.length > 1) {
                    options[currentWrapper].selected = 'selected';
                    colorSelector.dispatchEvent(new Event('change'));
                } 
                else if (currentSection.querySelector('#onbtn')) {
                    
                    particlesSelector.checked = !particlesSelector.checked
                    particlesSelector.dispatchEvent(new Event('change'));
                    
                    if (particlesSelector.checked) {
                        currentSection.querySelector('#onbtn').style.visibility = "visible"
                        currentSection.querySelector('#offbtn').style.visibility = "hidden"
                    } else if (!particlesSelector.checked) {
                        currentSection.querySelector('#onbtn').style.visibility = "hidden"
                        currentSection.querySelector('#offbtn').style.visibility = "visible"
                    }
                } // else if => for brightness           
            }
        }
    }
}

let close = () => {

    if (window.getComputedStyle(menu).getPropertyValue('opacity') == 1) {

        focus = menu.getElementsByClassName("focus")[0]

        if(focus.classList.contains('themeSelector')) { // close the settingswrapper
            
            rows[subSection].classList.add('focus');
            settingswrapper.style.opacity = 0;
            settingswrapper.querySelectorAll('label').forEach(label => {
                if(label.classList.contains('focus')) {
                    label.classList.remove('focus')
                }
            })
        
        }
        else if(focus.classList.contains('soundSelector')) {
            
            console.log('toto')
            rows[subSection].classList.add('focus');
            settingswrapper.style.opacity = 0;


        }
        else if(focus.classList.contains('dateSelector')) {

            console.log('tata')
            rows[subSection].classList.add('focus');
            settingswrapper.style.opacity = 0;


        }
        else if (focus.classList.contains('themewrapper')) { // close settings details "themewrapper"

            settingswrapper.querySelectorAll('label')[currentLabel].classList.add('focus')
            focus.classList.remove('focus')
            currentWrapper = 0
        }
        else {
            removeInfos()
        }

    }
}

let right  = () => {

    if(settingswrapper.querySelectorAll('label')[currentLabel].classList.contains('focus')) {
        // check if settingswrapper is opened & focus on label
    } 
    else if(wrappers[currentWrapper].classList.contains('focus')) {
        // check if settingswrapper is opened & focus on themewrapper
    } 
    else {
        sectionNumber++;
        sectionCheck();
        setColActive(true, false);
        focusSubMenu(false, false, true, false);
    }

}

let left  = () => {

    if(settingswrapper.querySelectorAll('label')[currentLabel].classList.contains('focus')) {
        // check if settingswrapper is opened
    } 
    else if(wrappers[currentWrapper].classList.contains('focus')) {
        // check if settingswrapper is opened & focus on themewrapper
    } 
    else {
        sectionNumber--;
        sectionCheck();              
        setColActive(false, true);
        focusSubMenu(false, false, false, true);
    }

}

let down  = () => {
    
    // check if settingswrapper is opened, if it is navigate into it
    if(settingswrapper.querySelectorAll('label')[currentLabel].classList.contains('focus')) {
        currentLabel++;

        if(currentLabel > settingswrapper.querySelectorAll('label').length-1){
            currentLabel = settingswrapper.querySelectorAll('label').length-1
        }

        settingswrapper.querySelectorAll('label')[currentLabel-1].classList.remove('focus')
        settingswrapper.querySelectorAll('label')[currentLabel].classList.add('focus')
    } 
    else if(wrappers[currentWrapper].classList.contains('focus')) {
        // check if settingswrapper is opened & focus on themewrapper

        currentWrapper++;

        if (currentWrapper > wrappers.length-1) {
            currentWrapper = wrappers.length-1;
        }

        wrappers[currentWrapper].classList.add('focus')
        if(wrappers[currentWrapper-1]) {
            wrappers[currentWrapper-1].classList.remove('focus')
        }
    } 
    else {
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
}

let up  = () => {

    // check if settingswrapper is opened, if it is navigate into it
    if(settingswrapper.querySelectorAll('label')[currentLabel].classList.contains('focus')) {
        currentLabel--;

        if(currentLabel < 0){
            currentLabel = 0
        }

        settingswrapper.querySelectorAll('label')[currentLabel].classList.add('focus')
        if (settingswrapper.querySelectorAll('label')[currentLabel+1]) {
            settingswrapper.querySelectorAll('label')[currentLabel+1].classList.remove('focus')
        }
    } 
    else if(wrappers[currentWrapper].classList.contains('focus')) {
        // check if settingswrapper is opened & focus on themewrapper

        currentWrapper--;

        if (currentWrapper < 0) {
            currentWrapper = 0;
        }

        wrappers[currentWrapper].classList.add('focus')
        if(wrappers[currentWrapper+1]) {
            wrappers[currentWrapper+1].classList.remove('focus')
        }
    } 
    else {
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

    
}

colorSelector.addEventListener("change", (e) => {
    e.preventDefault();
    let colorParsed = colorSelector.value.split(',').map(Number)
    drawParams.backgroundColor = colorParsed
})

particlesSelector.addEventListener("change", (e) => {
    e.preventDefault();
    let opac = 1;

    if(particlesSelector.checked) {
        opac = 1;
    } else if (!particlesSelector.checked) {
        opac = 0;
    }

    drawParams.particleOpacity = opac;
})

brightnessSelector.addEventListener("change", (e) => {
    e.preventDefault();
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