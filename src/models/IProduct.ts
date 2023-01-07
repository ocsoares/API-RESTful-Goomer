export interface IProduct {
    readonly id?: string;
    readonly photo_url?: string;
    readonly name: string;
    readonly price: number;
    readonly category: string;
    readonly onSale: {
        description: string,
        newPrice: number,
        day_and_hour: string;
    };
}