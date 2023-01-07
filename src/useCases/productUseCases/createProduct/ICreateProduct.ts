export interface ICreateProductRequest {
    photo_url?: string;
    name: string;
    price: number;
    category: string;
    description_onsale: string,
    new_price_onsale: number,
    day_and_hour_onsale: string;
}