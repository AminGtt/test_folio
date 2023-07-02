const startupSound = document.getElementById("startup"),
titles = document.getElementById("title"),
warning = document.getElementById("warning"),
warningTime = 5000;

// startupSound.play();

let checkLoad = () =>{
    return new Promise((resolve) => {
        window.onload = resolve;
    });
};

let titlesTimeOut = () =>{
    return new Promise(resolve => {
        setTimeout(resolve, 3000);
    }
    );
}

let warningTimeOut = () => {
    return new Promise(resolve => {
        setTimeout(resolve, warningTime);
    }
    );
};

let warningDisplay = async () =>{
    await titlesTimeOut();
    titles.remove();
    warning.style.opacity = '1';
    setTimeout( () =>{
        warning.style.opacity = '0';
        warning.remove();
    }, warningTime);
    await warningTimeOut();
};

let loadTitles = async () =>{
    await checkLoad();
    titles.style.opacity = '1';
    await warningDisplay();
};

let loadMenu = async () =>{
    await loadTitles();
    setClock();
    clockSection.style.opacity = '1'
};

loadMenu();