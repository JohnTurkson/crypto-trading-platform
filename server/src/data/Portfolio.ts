import Resource from "./Resource"
import Asset from "./Asset";
import PortfolioData from "./PortfolioData";
import AssetData from "./AssetData";

export default interface Portfolio extends PortfolioData, Resource {
    readonly assets: AssetData[],
    readonly userId: string,
    readonly id: string,
}
