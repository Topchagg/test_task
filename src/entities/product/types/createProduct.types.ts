import { comment } from "../../comment/comment.types"

interface createProduct {
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

export type {createProduct}