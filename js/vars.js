const startupSound = document.getElementById("startup"),
    header = document.getElementById("header"),
    disclaimer = document.getElementById("disclaimer"),
    disclaimerTime = 1000,
    headerTime = 1000,
    navSound = document.getElementById("nav"),
    xmbMain = document.getElementById("xmb"),
    settingswrapper = document.getElementById("settingswrapper"),
    cols = document.querySelectorAll('.xmb_col'),
    dateTime = document.getElementById("date"),
    clockSection = document.getElementById("clock");

let menu = document.getElementById("menu"),
    welcomer = document.getElementById("welcomer"),
    welcomerTime = 1000000,
    sectionNumber = 0,
    subSection = 0,
    menuLeftPos = 29,
    subSectionTopPos = 0,
    sn = 1,
    rows = cols[sectionNumber].querySelector('.xmb_row').querySelectorAll('.xmb_row_content'),
    savedSubSections = [0],
    maininfo = document.getElementById("maininfo"),
    colorSelector = document.getElementById("colorSelector"),
    particlesSelector = document.getElementById("particlesSelector"),
    brightnessSelector = document.getElementById("brightnessSelector"),
    info,
    infos,
    focus,
    goNextStep = false;