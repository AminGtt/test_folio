window.addEventListener("gamepadconnected", (e) => {
    e.preventDefault();
    
    function gameLoop() {
        const controller = navigator.getGamepads()[0];

        controller.buttons.map(e => e.pressed).forEach((isPressed) => {
			if(isPressed) {
                let keyboardIcons = document.querySelectorAll('.details_icon'),
                controllerIcons = document.querySelectorAll(".xbox_key_icon");

                keyboardIcons.forEach(icon => {
                icon.style.opacity = 0;
                })

                controllerIcons.forEach(icon => {
                icon.style.opacity = 1;
                })
			}
		})

        controller.axes.map(e => e).forEach((stickPos) => {
			if(stickPos > 0.2 || stickPos < -0.2) {
                let keyboardIcons = document.querySelectorAll('.details_icon'),
                controllerIcons = document.querySelectorAll(".xbox_key_icon");

                keyboardIcons.forEach(icon => {
                icon.style.opacity = 0;
                })

                controllerIcons.forEach(icon => {
                icon.style.opacity = 1;
                })
            }
		})
      
        if(controller.buttons[0].pressed){ // equivalent to enterKey pressed
            
            playNavSound();
            open();

        } else if (controller.buttons[1].pressed) { // equivalent to escKey pressed
            
            playNavSound();
            close();

        } else if (controller.buttons[14].pressed) { // equivalent to leftKey pressed
            
            playNavSound();
            left()

        } else if (controller.buttons[15].pressed) { // equivalent to rightKey pressed
            
            playNavSound();
            right()

        } else if (controller.buttons[12].pressed) { // equivalent to upKey pressed
            
            playNavSound();
            up();

        } else if (controller.buttons[13].pressed) { // equivalent to downKey pressed
            
            playNavSound();
            down();

        }
        

        
        setTimeout(() => {
            requestAnimationFrame(gameLoop);
        }, 100);
      }

      gameLoop();    
});

window.addEventListener("gamepaddisconnected", (e) => {
    e.preventDefault();
    console.log("Gamepad disconnected");
});