const startupSound = document.getElementById("startup"),
header = document.getElementById("header"),
menu = document.getElementById("menu"),
disclaimer = document.getElementById("disclaimer"),
disclaimerTime = 3000,
headerTime = 3000;

// startupSound.play();

let checkLoad = () =>{
    return new Promise((resolve) => {
        window.onload = resolve;
    });
};

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
    header.style.opacity = '1';
    await disclaimerDisplay();
};

let loadMenu = async () =>{
    await loadHeader();
    menu.style.opacity = '1';
    setClock();
    clockSection.style.opacity = '1';
};

loadMenu();