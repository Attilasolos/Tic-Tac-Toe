let next_player;
if (Math.random() < 0.5) next_player = "O";
else next_player = "X";
can_place = true;
n = 4

let grid = []
for (i = 0; i < n; i++) {
    grid.push([])
    for (j = 0; j < n; j++) grid[i].push(0)
    
}
mode = clicked_multi

function clicked_multi(event) {
    if (can_place == false) return
    const id = event.target.id
    const td = document.getElementById(id)
    const number = id.length == 3 ? id[2] : id[2] + id[3]
    // console.log(number)
    row = Math.floor((number - 1) / n)
    col = (number - 1) % n
    // console.log(row, col, id)
    if (td.innerHTML != "") return
    // console.log((next_player == "X" ? 2 : 1))
    grid[row][col] = next_player
    td.innerHTML = next_player
    next_player = next_player == "X" ? "O" : "X"
    // console.log(grid)
    if (chechwin() == "X") {setTimeout ("alert('X wins')", 1), can_place = false}
    if (chechwin() == "O") {setTimeout ("alert('O wins')", 1), can_place = false}
    if (chechwin() == "draw") location.reload()
    
}

function clear(){
    can_place = true
    grid.clear()
    for (i = 0; i < n; i++) {
        grid.push([])
        for (j = 0; j < n; j++) {
            grid[i].push(0)
        }
        document.getElementById("td" + (i + 1)).innerHTML = ""
    }

}

function createTable() {
    let table = document.createElement("table")
    for (i = 0; i < n; i++) {
        let tr = document.createElement("tr")
        for (j = 0; j < n; j++) {
            let td = document.createElement("td")
            td.id = "td" + (i * n + j + 1)
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    document.body.appendChild(table)
    if (mode == clicked_single && next_player == "O") dumb_bot()
}

function chechwin() {
    if (n == 3) {
        for (i = 0; i < n; i++) {
            if (grid[i][0] == grid[i][1] && grid[i][1] == grid[i][2] && grid[i][0] != 0) return grid[i][0]
            if (grid[0][i] == grid[1][i] && grid[1][i] == grid[2][i] && grid[0][i] != 0) return grid[0][i]
        }
        if (grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2] && grid[0][0] != 0) return grid[0][0]
        if (grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0] && grid[0][2] != 0) return grid[0][2]
    }
    if (n == 4) {
        for (i = 0; i < n; i++) {
            if (grid[i][0] == grid[i][1] && grid[i][1] == grid[i][2] && grid[i][2] == grid[i][3] && grid[i][0] != 0) return grid[i][0]
            if (grid[0][i] == grid[1][i] && grid[1][i] == grid[2][i] && grid[2][i] == grid[3][i] && grid[0][i] != 0) return grid[0][i]
        }
        if (grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2] && grid[2][2] == grid[3][3] && grid[0][0] != 0) return grid[0][0]
        if (grid[0][3] == grid[1][2] && grid[1][2] == grid[2][1] && grid[2][1] == grid[3][0] && grid[0][3] != 0) return grid[0][3]
    }
    if (n == 5) {
        for (i = 0; i < n; i++) {
            // console.log(i)
            if (grid[i][0] == grid[i][1] && grid[i][1] == grid[i][2] && grid[i][2] == grid[i][3] && grid[i][3] == grid[i][4] && grid[i][0] != 0) return grid[i][0]
            if (grid[0][i] == grid[1][i] && grid[1][i] == grid[2][i] && grid[2][i] == grid[3][i] && grid[3][i] == grid[4][i] && grid[0][i] != 0) return grid[0][i]
        }
        if (grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2] && grid[2][2] == grid[3][3] && grid[3][3] == grid[4][4] && grid[0][0] != 0) return grid[0][0]
        if (grid[0][4] == grid[1][3] && grid[1][3] == grid[2][2] && grid[2][2] == grid[3][1] && grid[3][1] == grid[4][0] && grid[0][4] != 0) return grid[0][4]
    }
    if (grid.flat().includes(0)) return 0
    // can_place = false
    return "draw"
}

function clicked_single(event) {
    
    const id = event.target.id
    const td = document.getElementById(id)
    const number = id.length == 3 ? id[2] : id[2] + id[3]
    // console.log(number)
    row = Math.floor((number - 1) / n)
    col = (number - 1) % n
    // console.log(row, col, id)
    if (td.innerHTML != "") return
    // console.log((next_player == "X" ? 2 : 1))
    grid[row][col] = next_player
    td.innerHTML = next_player
    next_player = next_player == "X" ? "O" : "X"
    dumb_bot()
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
    console.log(next_player)
    console.log(chechwin())
}

function play_end() {
    document.getElementById('play_button').style.visibility = "hidden";
    document.getElementById('mode_chooser').style.visibility = 'visible';
    document.getElementById('mode_chooser').style.animationName = "fade_in";
    // console.log("faded in")
}

// for (i = 0; i < n * n; i++) document.getElementById("td" + (i + 1)).addEventListener("click", mode, true)
document.getElementById('play_button').addEventListener("click", () => {document.getElementById('play_button').style.animationName = 'fade_out'})
document.getElementById('play_button').addEventListener("animationend", play_end)
document.getElementById("player1_button").addEventListener("click", () => {
        mode = clicked_single
        document.getElementById('mode_chooser').style.animationName = "fade_out"
    })
document.getElementById("players2_button").addEventListener("click", () => {
    mode = clicked_multi
    document.getElementById('mode_chooser').style.animationName = "fade_out"
    })

// document.getElementById()