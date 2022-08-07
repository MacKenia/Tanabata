let snowflakes_count = 100;

// let base_css = ``; // Put your custom base css here

var color_sheet = [];

if (typeof total !== 'undefined'){
    snowflakes_count = total;
}

function hearts() {
    heart_list = ["💖", "💗", "🧡", "💙", "💝", "💕", "💛", "💜"];
    heart_color = [
        "red",
        "pink",
        "orange",
        "blue",
        "red",
        "red",
        "yellow",
        "purple",
    ];
    tar = parseInt((Math.random() * 10) % heart_color.length);
    return [heart_list[tar], heart_color[tar]];
}

// This function allows you to turn on and off the snow
function toggle_snow() {
    let check_box = document.getElementById("toggle_snow");
    if (check_box.checked == true) {
        document.getElementById('snow').style.display = "block";
    }
    else {
        document.getElementById('snow').style.display = "none";
    }
}

// Creating snowflakes
function spawn_snow(snow_density = 200) {
    snow_density -= 1;

    for (let x = 0; x < snow_density; x++) {
        let heart = hearts();
        let board = document.createElement('div');
        board.className = "snowflake";
        board.textContent = heart[0];
        color_sheet.push(heart[1]);
        document.getElementById('snow').appendChild(board);
    }
}

// Append style for each snowflake to the head
function add_css(rule) {
    let css = document.createElement('style');
    css.type = 'text/css';
    css.appendChild(document.createTextNode(rule)); // Support for the rest
    document.getElementsByTagName("head")[0].appendChild(css);
}



// Math
function random_int(value = 100){
    return Math.floor(Math.random() * value) + 1;
}

function random_range(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Create style for snowflake
function spawnSnowCSS(snow_density = 200){
    let snowflake_name = "snowflake";
    let rule = ``;
    if (typeof base_css !== 'undefined'){
        rule = base_css;
    }
    
    for(let i = 1; i < snow_density; i++){
        let random_x = Math.random() * 90; // vw
        let random_offset = random_range(-100000, 100000) * 0.0001; // vw;
        let random_x_end = random_x + random_offset;
        let random_x_end_yoyo = random_x + (random_offset / 2);
        let random_yoyo_time = random_range(30000, 80000) / 100000;
        let random_yoyo_y = random_yoyo_time * 100; // vh
        let random_scale = Math.random();
        let fall_duration = random_range(10, 30) * 1; // s
        let fall_delay = random_int(30) * -1; // s
        let opacity_ = Math.random();
        let color_heart = color_sheet[i-1];

        rule += `
        .${snowflake_name}:nth-child(${i}) {
            opacity: ${opacity_};
            transform: translate(${random_x}vw, -10px) scale(${random_scale});
            animation: fall-${i} ${fall_duration}s ${fall_delay}s linear infinite;
            filter: drop-shadow(0 0 5px ${color_heart});
        }
        
        @keyframes fall-${i} {
            ${random_yoyo_time*100}% {
                transform: translate(${random_x_end}vw, ${random_yoyo_y}vh) scale(${random_scale});
            }

            to {
                transform: translate(${random_x_end_yoyo}vw, 100vh) scale(${random_scale});
            }
            
        }
        `
    }

    add_css(rule);
}

// Load the rules and execute after the DOM loads
window.onload = function() {
    spawn_snow(snowflakes_count);
    spawnSnowCSS(snowflakes_count);
};

// TODO add progress bar for slower clients
