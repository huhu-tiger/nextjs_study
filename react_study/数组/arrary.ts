// https://github.com/LearningTypeScript/projects/tree/main/projects/arrays

//浅比较 (analyzing-dna-Shallow Equality)
export function shallowEqual(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) {
        return false
    }
    // 这里使用 for(let i=0;i<arr1.length;i++)  更合适，演示arr.every效果
    let resultArr:boolean[]=[]
    arr1.forEach((item, index) => {
        resultArr.push(item===arr2[index])
    })

    return resultArr.every(v => v === true);
}
console.log(`浅比较: ${shallowEqual([1, 2, 3], [1, 2, 3])}`)
console.log(`浅比较: ${shallowEqual([1, 2, 3], [1, 2, 1])}`)

// 浅差异 (analyzing-dna-Shallow Differences)
/*
不一样的位置 填充undefined
*/
function showDifferences(arr1: any[], arr2: any[]): any[] | undefined {
    if (arr1.length != arr2.length) {
        return undefined
    }
    let result: any[] = []
    arr1.forEach((item, index) => {
        result.push(item === arr2[index] ? item : undefined)
    })
    return result
}
console.log(`浅差异 `)
console.log(showDifferences([1, 1, 3], [1, 2, 3]))

// 深度相等 (analyzing-dna-Deep Equality )
function deepEqual(arr1:string[][],arr2:string[][]):boolean{
    if (arr1.length != arr2.length){
        return false
    }

    for (let i=0;i<arr1.length;i++){
        if (!shallowEqual(arr1[i],arr2[i])){
            return false
        }
    }

    return true
}
const darr1:string[][]=[
    ["2", "1", "1"],
    ["2", "2", "2"]
]
const darr2:string[][]=[
    ["2", "1", "1"],
    ["2", "2", "2"]
]
const darr3:string[][]=[
    ["3", "2", "2"],
    ["1", "1", "1"]
]
console.log(`深比较 ${deepEqual(darr1,darr2)}`)
console.log(`深比较 ${deepEqual(darr1,darr3)}`)


// 深差异 (analyzing-dna-Deep Differences)
/*
不一样的位置 undefined
*/
function DeepDifferences(arr1: string[][], arr2: string[][]):  ((string|undefined)[]|undefined)[] | undefined {
    if (arr1.length != arr2.length) {
        return undefined
    }
    let result: ((string|undefined)[]| undefined)[] =[]

    for (let i=0;i<arr1.length;i++){
        if (arr1[i].length != arr2[i].length){
            result.push(undefined)
            continue
        }

        let tmpresult: (string|undefined)[] = []
        arr1[i].forEach((item, index) => {
            tmpresult.push(item === arr2[i][index] ? item : undefined)
        })
        result.push(tmpresult)

    }

    return result
}

const ddarr1:string[][]=[
    ["2", "1", "1"],
    ["2", "2", "2"]
]

const ddarr2:string[][]=[
    ["2", "1", "1"],
    ["2", "2", "2"]
]
const ddarr3:string[][]=[
    ["2", "1", "2"],
    ["1", "2", "1"]
]
console.log(`深差异:`)
console.log(DeepDifferences(ddarr1,ddarr2))
console.log(DeepDifferences(ddarr1,ddarr3))