import Resource from "./Resource"

export default interface Coin extends Resource {
    readonly name: string,
    readonly price: string,
}
