
// 覆盖属性
interface WithNullableName{
    name: string| null
}
interface WithNonNullableName extends WithNullableName{
    name:string
}
/*
同名属性：
  扩展接口（WithNumbericName） 必须是 基础接口(WithNullableName) 类型的子集
*/
interface WithNumbericName extends  WithNullableName{
    name: number | string
}


//
interface GivesNumber {
    giveNumber():number
}
interface GivesString{
    giveString():string
}
interface GivesBothAndEither extends GivesNumber,GivesString{
    giveEither():number|string
}

function GivesBoth(instance:GivesBothAndEither){
    instance.giveNumber()
    instance.giveString()
    instance.giveEither()
}