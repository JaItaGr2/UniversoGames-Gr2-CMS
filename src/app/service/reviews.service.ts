import { Injectable } from '@angular/core';
import { NewReview, Review } from '../model/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private reviews: Review[] = [
    {
      _id: '63e270cb9d4681180b141f6b',
      title: 'Fire Emblem Engage',
      publicationDate: '2023-02-10',
      content: 'Nuovo Gioco di Fire Emblem annunciato',
      score: 10,
      reviewerName: 'Mario Rossi',
      imageUrls: [
        'https://sm.ign.com/ign_it/preview/f/fire-emble/fire-emblem-engage-preview-a-loving-tribute-to-nonexistent-n_ebat.jpg',
        'https://i.ytimg.com/vi/3xTPZpDDACU/maxresdefault.jpg',
      ],
      reviewedGame: {
        id: '63e26b5516952167414879d0',
        name: 'Fire Emblem',
      },
    },
    {
      _id: '63e270cb9d4681180b141f6c',
      title: 'Fire Emblem Engage',
      publicationDate: '2023-02-10',
      content: 'Nuovo Gioco di Fire Emblem annunciato',
      score: 10,
      reviewerName: 'Mario Rossi',
      imageUrls: [
        'https://sm.ign.com/ign_it/preview/f/fire-emble/fire-emblem-engage-preview-a-loving-tribute-to-nonexistent-n_ebat.jpg',
        'https://i.ytimg.com/vi/3xTPZpDDACU/maxresdefault.jpg',
      ],
      reviewedGame: {
        id: '63e26b5516952167414879d0',
        name: 'Fire Emblem',
      },
    },
    {
      _id: '63e270cb9d4681180b141f6d',
      title: 'Fire Emblem Engage',
      publicationDate: '2023-02-10',
      content: 'Nuovo Gioco di Fire Emblem annunciato',
      score: 10,
      reviewerName: 'Mario Rossi',
      imageUrls: [
        'https://sm.ign.com/ign_it/preview/f/fire-emble/fire-emblem-engage-preview-a-loving-tribute-to-nonexistent-n_ebat.jpg',
        'https://i.ytimg.com/vi/3xTPZpDDACU/maxresdefault.jpg',
      ],
      reviewedGame: {
        id: '63e26b5516952167414879d0',
        name: 'Fire Emblem',
      },
    },
  ];

  getReviews() {
    return this.reviews.slice();
  }

  getReview(id: string): Review | undefined {
    return this.reviews.find((r) => r._id === id);
  }

  addReview(newReview: NewReview) {
    //TODO:
    //this.reviews.push(newReview);
    console.log('add: ' + newReview);
  }

  eliminaReview(id: string) {
    //TODO:
    //this.reviews = this.reviews.filter((r) => r._id !== id);
    console.log('elimina' + id);
  }

}
