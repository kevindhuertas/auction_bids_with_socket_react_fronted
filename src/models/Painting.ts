export type Painting = {
    id: number;
    painter: string;
    title: string;
    year: number;
    price: number;
    isSold: boolean;
    lastBidID: number | null;
    image: string;
};