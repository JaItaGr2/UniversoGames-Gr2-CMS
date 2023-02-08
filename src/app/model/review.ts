export interface Review {
    _id: string;
    title: string;
    publicationDate: string;
    content: string;
    score: number;
    reviewerName: string;
    imageUrls: string[];
    reviewedGame: ReviewedGame;
}

export interface ReviewedGame {
    id: string;
    name: string;
}

export type NewReview = Omit<Review, '_id'>;