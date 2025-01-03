// import structuredClone from '@ungap/structured-clone';

let next_player = Math.random() < 0.5 ? "O" : "X";
can_place = true;
n = 3
let name1, name2 = "Bot";

let grid = []
for (i = 0; i < 5; i++) {
    grid.push([])
    for (j = 0; j < 5; j++) {
        grid[i].push(0)
    }
}
mode = clicked_single

// document.body.addEventListener('load', smart_bot())

function logIn() {
    // Write your code here
    console.log("LogIn")
    document.getElementById("sign_in").style.animationName = "fade_out";
}

document.getElementById("sign_in").addEventListener("animationend", () => {
    if (document.getElementById("sign_in").style.animationName == "fade_out") {
        document.getElementById("sign_in").style.visibility = "hidden";
        document.getElementById("play_button").style.visibility = "visible";
        // document.getElementById("play_button").style.animationName = "fade_in";
    }
})

function smart_bot() {
    let is_winning = chech_force();
    if (is_winning){
        let [row, col] = is_winning
        grid[row][col] = 'O';
        document.getElementById("td" + (row * n + col+1)).innerHTML = 'O';
        next_player = 'X'
        return 0;
    } 
    dumb_bot()



    function chech_force() {
        for (let i=0;i<n;i++){
            for (let j=0;j<n;j++){
                if (grid[i][j] == '0'){
                    tempt_grid = window.structuredClone(grid);
                    tempt_grid[i][j] = 'O'
                    if (chechwin(tempt_grid) == 'O' ){console.log('winning');return [i, j]} 
                }
            }   
        }
        for (let i=0;i<n;i++){
            for (let j=0;j<n;j++){
                if (grid[i][j] == '0'){
                    tempt_grid = window.structuredClone(grid);
                    tempt_grid[i][j] = 'X'    
                    if (chechwin(tempt_grid) == 'X') {console.log('losing');return [i, j]}
                }
            }   
        }
        
        return 0;
    }
}

function clicked_multi(event) {
    if (can_place == false){console.log("can't place");return} 
    const id = event.target.id
    const td = document.getElementById(id)
    const number = id.length == 3 ? id[2] : id[2] + id[3]
    row = Math.floor((number - 1) / n)
    col = (number - 1) % n
    if (td.innerHTML != "") return
    grid[row][col] = next_player
    td.innerHTML = next_player
    next_player = next_player == "X" ? "O" : "X"
    if (chechwin(grid) == "X" || chechwin(grid) == "O") {
        can_place = false;
        winner = chechwin(grid) == 'O' ? name2 : name1
        console.log(winner + ' won')
        document.getElementById("winner").innerText = winner + " won"
        setTimeout(() => {
            document.getElementById("game_start").style.animationName = "fade_out"
        }, 500)
    }
    if (chechwin(grid) == 'draw') clear()
}

function clear(){
    can_place = true
    grid = []

    for (i = 0; i < 5; i++) {
        grid.push([])
        for (j = 0; j < 5; j++) {
            grid[i].push(0)
        }
    }
    document.getElementById("table_div").innerHTML = ""
    createTable(playable = true, parent = document.getElementById("table_div"))
}

function createTable(playeble = false, parent = document.body) {
    if (!playeble) {
        let table = document.createElement("table")
        for (i = 0; i < n; i++) {
            let tr = document.createElement("tr")
            for (j = 0; j < n; j++) {
                let td = document.createElement("td")
                td.style.width = (356 - (n-1)*3)/n + "px";
                td.style.height = (356 - (n-1)*3)/n + "px";
                td.style.background = "white"
                tr.appendChild(td)
            }
            table.appendChild(tr)
        }
        parent.appendChild(table)
        let h1 = document.createElement("h1")
        h1.innerHTML = "Play"
        h1.id = 'play_start'
        h1.style.width = "200px"
        h1.style.cursor = "pointer"
        // h1.style.textDecoration = "None"
        parent.appendChild(h1)
        document.getElementById("play_start").addEventListener("click", () => {document.getElementById("size").style.animationName = "fade_out"})
        return
    }
    let table = document.createElement("table")
    for (i = 0; i < n; i++) {
        let tr = document.createElement("tr")
        for (j = 0; j < n; j++) {
            let td = document.createElement("td")
            td.id = "td" + (i * n + j + 1)
            td.style.width = (666 - (n-1)*3)/n + "px";
            td.style.height = (666 - (n-1)*3)/n + "px";
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    table.id = "game_table"
    parent.appendChild(table)
    for (i = 0; i < n * n; i++) document.getElementById("td" + (i + 1)).addEventListener("click", mode, true)
    if (mode == clicked_single && next_player == "O") dumb_bot()
}

function chechwin(grid1) {
    if (n == 3) {
        for (i = 0; i < n; i++) {
            if (grid1[i][0] == grid1[i][1] && grid1[i][1] == grid1[i][2] && grid[i][0] != 0) return grid1[i][0]
            if (grid1[0][i] == grid1[1][i] && grid1[1][i] == grid1[2][i] && grid[0][i] != 0) return grid1[0][i]
        }
        if (grid1[0][0] == grid1[1][1] && grid1[1][1] == grid1[2][2] && grid1[0][0] != 0) return grid1[0][0]
        if (grid1[0][2] == grid1[1][1] && grid1[1][1] == grid1[2][0] && grid1[0][2] != 0) return grid1[0][2]
    }
    if (n == 4) {
        for (i = 0; i < n; i++) {
            if (grid1[i][0] == grid1[i][1] && grid1[i][1] == grid1[i][2] && grid1[i][2] == grid1[i][3] && grid1[i][0] != 0) return grid1[i][0]
            if (grid1[0][i] == grid1[1][i] && grid1[1][i] == grid1[2][i] && grid1[2][i] == grid1[3][i] && grid1[0][i] != 0) return grid1[0][i]
        }
        if (grid1[0][0] == grid1[1][1] && grid1[1][1] == grid1[2][2] && grid1[2][2] == grid1[3][3] && grid1[0][0] != 0) return grid1[0][0]
        if (grid1[0][3] == grid1[1][2] && grid1[1][2] == grid1[2][1] && grid1[2][1] == grid1[3][0] && grid1[0][3] != 0) return grid1[0][3]
    }
    if (n == 5) {
        for (i = 0; i < n; i++) {
            if (grid1[i][0] == grid1[i][1] && grid1[i][1] == grid1[i][2] && grid1[i][2] == grid1[i][3] && grid1[i][3] == grid1[i][4] && grid1[i][0] != 0) return grid1[i][0]
            if (grid1[0][i] == grid1[1][i] && grid1[1][i] == grid1[2][i] && grid1[2][i] == grid1[3][i] && grid1[3][i] == grid1[4][i] && grid1[0][i] != 0) return grid1[0][i]
        }
        if (grid1[0][0] == grid1[1][1] && grid1[1][1] == grid1[2][2] && grid1[2][2] == grid1[3][3] && grid1[3][3] == grid1[4][4] && grid1[0][0] != 0) return grid1[0][0]
        if (grid1[0][4] == grid1[1][3] && grid1[1][3] == grid1[2][2] && grid1[2][2] == grid1[3][1] && grid1[3][1] == grid1[4][0] && grid1[0][4] != 0) return grid1[0][4]
    }
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            if (grid1[i][j] == 0){
                console.log(i, j)
                return 0
            } 
        }
    }
    // can_place = false
    return "draw"
}

function clicked_single(event) {
    const id = event.target.id
    const td = document.getElementById(id)
    const number = id.length == 3 ? id[2] : id[2] + id[3]
    row = Math.floor((number - 1) / n)
    col = (number - 1) % n
    if (td.innerHTML != "") return
    grid[row][col] = next_player
    td.innerHTML = next_player
    next_player = next_player == "X" ? "O" : "X"
    let result = chechwin(grid)
    if (result == "X" || result == "O") {
        can_place = false;
        winner = result == 'O' ? name2 : name1
        document.getElementById("winner").innerText = winner + " won"
        setTimeout(() => {
            document.getElementById("game_start").style.animationName = "fade_out"
        }, 500)
        return 
    }
    if (result == "draw") {
        clear();
        can_place = true;
        return 0;
    }
    can_place = false;
    setTimeout(() => {
        smart_bot()
        result = chechwin(grid)
        if (result == "X" || result == "O") {
            can_place = false;
            winner = result == 'O' ? name2 : name1
            document.getElementById("winner").style.paddingTop = "25px"; 
            document.getElementById("winner").innerText = "YOU GOT CLAPPED BY A BOT"
            setTimeout(() => {
                document.getElementById("game_start").style.animationName = "fade_out"
            }, 500) 
        }
        if (result == "draw") {
            console.log('draw')
            clear();
            can_place = true;
            return;
        } else console.log('not draw', result)
    }, 150)
    
}

function dumb_bot() {
    let row, col
    do {
        row = Math.floor(Math.random() * n)
        col = Math.floor(Math.random() * n)
    } while (grid[row][col] != 0)
    grid[row][col] = next_player
    document.getElementById("td" + (row * n + col + 1)).innerHTML = next_player
    next_player = next_player == "X" ? "O" : "X"
}

function play_end() {
    document.getElementById('play_button').style.visibility = "hidden";
    document.getElementById('mode_chooser').style.visibility = 'visible';
    document.getElementById('mode_chooser').style.animationName = "fade_in";
}

document.getElementById('play_button').addEventListener("click", () => {document.getElementById('play_button').style.animationName = 'fade_out'})
document.getElementById('play_button').addEventListener("animationend", play_end)
document.getElementById("player1_button").addEventListener("click", () => {
        mode = clicked_single
        document.getElementById('mode_chooser').style.animationName = "fade_out";
})
document.getElementById("mode_chooser").addEventListener("animationend", () => {
    if (document.getElementById("mode_chooser").style.animationName == "fade_out") {
        if (mode == clicked_single){
            document.getElementById('mode_chooser').style.visibility = 'hidden';
            document.getElementById('one_player_namer').style.visibility = 'visible';
            document.getElementById('one_player_namer').style.animationName = 'fade_in';
        }
        else {
            document.getElementById('mode_chooser').style.visibility = 'hidden';
            document.getElementById('two_player_namer').style.visibility = 'visible';
            document.getElementById('two_player_namer').style.animationName = 'fade_in';
        }
    }
})

function speedchange(event) {
    // document.getElementById('td1').style.transitionDuration = event.target.value + 's'
    r = document.querySelector(':root')
    r.style.setProperty('--animation_time', event.target.value/100 + 's')
}

document.getElementById("players2_button").addEventListener("click", () => {
    mode = clicked_multi
    document.getElementById('mode_chooser').style.animationName = "fade_out"
    // document.getElementById('mode_chooser').style.visibility = 'hidden';
})

document.getElementById("one_player_namer").addEventListener("keydown", (event) => {
    if (event.key == 'Enter'  && document.getElementById('player_name').value != "") {
        name1 = document.getElementById('player_name').value
        document.getElementById('one_player_namer').style.animationName = 'fade_out'
    }
}, true)

document.getElementById("two_player_namer").addEventListener("keydown", (event) => {
    if (event.key == 'Enter'  && document.getElementById('player1_name').value != "" && document.getElementById('player2_name').value != "") {
        name1 = document.getElementById('player1_name').value
        name2 = document.getElementById('player2_name').value
        document.getElementById('two_player_namer').style.animationName = 'fade_out'
    }
}, true)

document.getElementById("one_player_namer").addEventListener("animationend", () => {
    if (document.getElementById('one_player_namer').style.animationName == 'fade_out') {
        document.getElementById('one_player_namer').style.visibility = 'hidden';
        document.getElementById('size').style.visibility = 'visible';
        document.getElementById('size').style.animationName = 'fade_in';
        createTable(playable = false, parent = document.getElementById("size_projection"))
    }
})

document.getElementById("two_player_namer").addEventListener("animationend", () => {
    if (document.getElementById('two_player_namer').style.animationName == 'fade_out') {
        document.getElementById('two_player_namer').style.visibility = 'hidden';
        document.getElementById('size').style.visibility = 'visible';
        document.getElementById('size').style.animationName = 'fade_in';
        createTable(playable = false, parent = document.getElementById("size_projection"))
    }
})

document.getElementById("sign_in_nav").addEventListener("click", () => {
    document.getElementById("play_button").style.visibility = "hidden";
    document.getElementById("sign_in").style.visibility = "visible";
    document.getElementById("sign_in").style.animationName = "fade_in";
})

document.getElementById("size3").addEventListener("click", (event)=>{
    n = 3;
    document.querySelector(":root").style.setProperty("--table_size", 3)
    
    // grid.clear
    // for (i = 0; i < n; i++) {
    //     grid.push([])
    //     for (j = 0; j < n; j++) grid[i].push(0)
    // }

    document.getElementById("size3").style.border = "2px solid white"   
    document.getElementById("size5").style.border = "none"   
    document.getElementById("size4").style.border = "none"
    document.getElementById("size_projection").innerHTML = ""
    createTable(playable = false, parent = document.getElementById("size_projection"))
}, true)
document.getElementById("size4").addEventListener("click", (event)=>{
    n = 4;
    document.querySelector(":root").style.setProperty("--table_size", 4)
    // grid.clear
    // for (i = 0; i < n; i++) {
    //     grid.push([])
    //     for (j = 0; j < n; j++) grid[i].push(0)
    // }
    document.getElementById("size4").style.border = "2px solid white";
    document.getElementById("size5").style.border = "none";  
    document.getElementById("size3").style.border = "none"; 
    document.getElementById("size_projection").innerHTML = ""
    createTable(playable = false, parent = document.getElementById("size_projection")) 
}, true)
document.getElementById("size5").addEventListener("click", (event)=>{
    n = 5;
    document.querySelector(":root").style.setProperty("--table_size", 5)
    const sizes = document.getElementsByTagName("h2")
    document.getElementById("size5").style.border = "2px solid white";  
    document.getElementById("size4").style.border = "none";
    document.getElementById("size3").style.border = "none";
    document.getElementById("size_projection").innerHTML = ""
    createTable(playable = false, parent = document.getElementById("size_projection"))
    // event.target.style.border = "2px solid black";
}, true)
document.getElementById("size").addEventListener("animationend", () => {
    if (document.getElementById("size").style.animationName == "fade_out") {
        document.getElementById("size").style.visibility = "hidden";
        document.getElementById("size_projection").innerHTML = ""
        document.getElementById("game_start").style.visibility = "visible";
        document.getElementById("name1").innerText = name1
        document.getElementById("name2").innerText = name2
        createTable(playable = true, parent = document.getElementById("table_div"))
    }
})
document.getElementById('animation_speed_input').addEventListener("change", speedchange, true)
document.getElementById('game_start').addEventListener("animationend", () => {
    clear();
    if (document.getElementById("game_start").style.animationName == "fade_out"){
        document.getElementById("game_start").style.visibility = "hidden";
        winner = chechwin(grid) == 'O' ? name2 : name1
        document.getElementById("play_end").style.visibility = "visible";
        document.getElementById("play_end").style.animationName = "fade_in";
    }
})
document.getElementById("enough").addEventListener('click', () => {
    document.getElementById("game_start").style.animationName = "";
    document.getElementById("play_end").style.visibility = 'hidden';
    document.getElementById('play_button').style.visibility = "visible"
    document.getElementById('play_button').style.animationName = ""
    document.getElementById("table_div").innerHTML = ' '
    document.getElementById("play_end").style.animationName = ''
})
document.getElementById('yes').addEventListener('click', ()=> {
    document.getElementById("game_start").style.animationName = "";
    document.getElementById("play_end").style.visibility = 'hidden';
    clear();
    can_place = true;
    document.getElementById("game_start").style.visibility = 'visible';
    document.getElementById("game_start").style.animationName = 'fade_in';
    
})