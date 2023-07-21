let checkLoad = () =>{
    return new Promise((resolve) => {
        window.onload = resolve;
    });
};

let welcomerTimeOut = async () =>{
    return new Promise((resolve) => {
        if (goNextStep === true) {
            resolve();
        } else {
            setTimeout(() => welcomerTimeOut().then(resolve), 100);
        }
    });
}

let headerTimeOut = () =>{
    return new Promise(resolve => {
        setTimeout(resolve, headerTime);
    }
    );
}

let disclaimerTimeOut = () => {
    return new Promise(resolve => {
        setTimeout(resolve, disclaimerTime);
    }
    );
};

let disclaimerDisplay = async () =>{
    await headerTimeOut();
    header.remove();
    disclaimer.style.opacity = '1';
    await disclaimerTimeOut();
    disclaimer.remove();
};

let loadHeader = async () =>{
    await checkLoad();

    //welcomer
    await welcomerTimeOut();
    welcomer.remove();
    startupSound.play();

    header.style.opacity = '1';
    await disclaimerDisplay();
};

let loadMenu = async () =>{
    await loadHeader();
    menu.style.opacity = '1';
    await setClock();
    clockSection.style.opacity = '1';
};

loadMenu();