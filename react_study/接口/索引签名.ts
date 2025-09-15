interface WordCounts {
    [i : string]:number
}

const counts:WordCounts = {}
counts.apple=0
counts.banana=1




// 属性与索引签名共存
interface HistoryicalNovels{
    Orooonoko:number
    text:0
    [i:string]:number
}
// 至少有属性
const vovels:HistoryicalNovels={
    Orooonoko:1,
    text:0 // 必须是0
}

// 数字类型 索引签名
interface MoreNarrowNumbers{
    [i:number]:string
    [i:string]:string|undefined
}
/*
当同时存在数字和字符串索引签名时，
数字索引的返回类型必须是字符串索引返回类型的子类型。这里string|undefined不是string的子类型，因为undefined不在string范围内。
*/
interface MoreNarrowStrings{
    [i:number]:string|undefined;
    [i:string]:string
}