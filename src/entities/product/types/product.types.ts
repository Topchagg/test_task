import { comment } from "../../comment/comment.types"

interface product {
    id:string
    name:string,
    imageUrl:string,
    count:number,
    size: {
        width:number,
        height:number
    },
    weight: number
    comments: comment[] | []
}

export type {product}