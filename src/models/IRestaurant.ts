export interface IRestaurant {
    readonly id: string;
    photo?: string;
    name: string;
    address: string;
    business_hours: string;
}

export interface IRestaurantProducts {
    readonly id?: string;
    photo?: string;
    name: string;
    price: number;
    category: string;
    onSale: {
        description: string,
        newPrice: number,
        day_and_hour: string;
    };
}