// import { ReviewList } from "./jsonParser";
// import { CommentsController } from "./comments/comments.controller";
// import { Comment } from "./comments/comments.model";
// import { CommentsService } from "./comments/comments.service";
// import { ReviewsController } from "./reviews/reviews.controller";
// import { Review } from "./reviews/reviews.model";
// import { ReviewsService } from "./reviews/reviews.service";


// const commentsService = new CommentsService(Comment);
// const commentsController = new CommentsController(commentsService);

// const reviewsService = new ReviewsService(
//   Review, 
//   commentsService);
// const reviewsController = new ReviewsController(reviewsService);


// export class LoaderToDatabase {

//   constructor (private parsedData = new ReviewList()) {}

//   async putReviewsToDatabase() {
//     try {
//       let movieKinopoiskId = this.parsedData.movieKinopoiskId;
//       for (let j = 0; j < this.parsedData.reviews.length; j++) {
//         let reviewId = Number(this.parsedData.reviewIds[j]);
//         let reviewAuthor = this.parsedData.reviewAuthors[j];
//         let reviewTitle = this.parsedData.reviewAuthors[j]
//         let reviewText = this.parsedData.reviewTitles[j];
//         let reviewDate = this.parsedData.reviewDates[j];    
//         await reviewsController.create({
//           reviewId,
//           reviewAuthor,
//           reviewTitle,
//           reviewText,
//           reviewDate,
//           movieKinopoiskId
//       });
//   } 
//     }catch (e) {
//       console.log('The review already exists', 3001);
//     }
// }
// async putCommentsToDatabase() {
//   try {
//     for (let j = 0; j < this.parsedData.reviewIds.length; j++) {
//       let reviewId = this.parsedData.reviewIds[j];
//       for (let i = 0; i < reviewId.length; i++) {
//         let commentId = Number(this.parsedData.commentIds[i]);
//         let commentText = this.parsedData.commentTexts[i];
//         let commentAuthor = this.parsedData.commentAuthors[i];
//         let commentDate = this.parsedData.commentDates[i];
//         await commentsController.create({
//           commentId, 
//           commentAuthor,
//           commentText,
//           reviewId,
//           commentDate
//       });
//         await reviewsController.updateReview
//           (
//             this.parsedData.reviewIds[i],
//             this.parsedData.commentIds,
//           );
//   } 
//   }
//   }catch (e) {
//     console.log('The comment already exists', 3002);
//   }
// }


//   async updateCommentsToReview() {
//     try {
//       for (let i = 0; i < this.parsedData.reviews.length; i++) {

//           await reviewsController.updateReview
//           (
//             this.parsedData.reviewIds[i],
//             this.parsedData.commentIds,
//           );
//     }
//     }catch (e) {
//       console.log('The review is updated already', 3003);
//     }
//    }
// }
