export interface IProduct {
    readonly id?: string;
    readonly photo_url?: string;
    readonly name: string;
    readonly price: number;
    readonly category: string;
    readonly description_onsale: string,
    readonly new_price_onsale: number,
    readonly day_and_hour_onsale: string;
}