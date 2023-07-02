const startupSound = document.getElementById("startup"),
header = document.getElementById("header"),
disclaimer = document.getElementById("disclaimer"),
disclaimerTime = 5000;

// startupSound.play();

let checkLoad = () =>{
    return new Promise((resolve) => {
        window.onload = resolve;
    });
};

let headerTimeOut = () =>{
    return new Promise(resolve => {
        setTimeout(resolve, 3000);
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
    setTimeout( () =>{
        disclaimer.style.opacity = '0';
        disclaimer.remove();
    }, disclaimerTime);
    await disclaimerTimeOut();
};

let loadHeader = async () =>{
    await checkLoad();
    header.style.opacity = '1';
    await disclaimerDisplay();
};

let loadMenu = async () =>{
    await loadHeader();
    setClock();
    clockSection.style.opacity = '1'
};

loadMenu();