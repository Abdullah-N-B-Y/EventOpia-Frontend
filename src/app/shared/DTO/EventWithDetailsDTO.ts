export interface EventWithDetailsDTO {
    id?: number;
    name: string;
    attendingCost?: number | null;
    startDate: Date;
    endDate: Date;
    status?: string | null;
    eventDescription?: string | null;
    imagePath?: string | null;
    eventCapacity?: number | null;
    latitude: number;
    longitude: number;
    address: string;
    eventCreatorId?: number | null;
    categoryId?: number | null;
    retrievedImageFile: string;
    categoryName?: string | null;
    creatorName?: string | null;
}
