const startupSound = document.getElementById("startup"),
header = document.getElementById("header"),
menu = document.getElementById("menu"),
disclaimer = document.getElementById("disclaimer"),
welcomer = document.getElementById("welcomer"),
disclaimerTime = 1000,
headerTime = 1000;

// startupSound.play();

let checkLoad = () =>{
    return new Promise((resolve) => {
        window.onload = resolve;
    });
};

let welcomerTimeOut = () =>{
    return new Promise(resolve => {
        setTimeout(resolve, 30000);
    }
    );
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

    await welcomerTimeOut()
    welcomer.remove()

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