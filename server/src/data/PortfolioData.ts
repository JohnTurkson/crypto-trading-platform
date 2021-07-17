import Resource from "./Resource"
import Asset from "./Asset";
import AssetData from "./AssetData";

export default interface PortfolioData extends Resource {
    readonly assets: AssetData[],
    readonly userId: string,
}
