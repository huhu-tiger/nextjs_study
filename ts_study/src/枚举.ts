
export function chageDirection(direction: "up" | "down" | "left" | "right"){
    console.log(direction)
}

chageDirection("up")
chageDirection("down")
chageDirection("left")


// enum DirectionEnum{
//     Up=0,
//     Down,
//     Left,
//     Right
// }

// 字符串枚举，必须有初始值
enum DirectionEnum{
    Up="up",
    Down="down",
    Left="left",
    Right="right"
}

let directionEnum:DirectionEnum = DirectionEnum.Up
console.log(directionEnum) // up





