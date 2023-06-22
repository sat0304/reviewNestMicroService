import { CommentsController } from "./comments/comments.controller";
import { Comment } from "./comments/comments.model";
import { CommentsService } from "./comments/comments.service";
import { ReviewsController } from "./reviews/reviews.controller";
import { Review } from "./reviews/reviews.model";
import { ReviewsService } from "./reviews/reviews.service";

const commentsService = new CommentsService(Comment);
const commentsController = new CommentsController(commentsService);

const reviewsService = new ReviewsService(
  Review, 
  commentsService);
const reviewsController = new ReviewsController(reviewsService);


export class ReviewList {

  async createReviews(reviewList: any) {
    try {
      const movieKinopoiskId = Number(reviewList.entityKinopoiskId);
      const reviews = reviewList.entityJSON;

      for (let i = 0; i < reviews.length; i++) {
        const reviewId = Number(reviews[i].reviewId);
        const reviewAuthor = reviews[i].author;
        const reviewTitle = reviews[i].title;
        const reviewText = reviews[i].text;
        const reviewDate = reviews[i].reviewDate;
        await reviewsController.create({
          reviewId,
          reviewAuthor,
          reviewTitle,
          reviewText,
          reviewDate,
          movieKinopoiskId
        });
        if (reviews[i].comments != null) {
          const commentList = reviews[i].comments;
          const commentReviewIds = [];
            for (let j = 0; j < commentList.length; j++) {
              commentReviewIds.push(Number(commentList[j].commentId));
              const commentId = Number(commentList[j].commentId);
              const commentAuthor = commentList[j].author;
              const commentText = commentList[j].text;
              const commentDate = commentList[j].commentDate;
              await commentsController.create({
                commentId, 
                commentAuthor,
                commentText,
                reviewId,
                commentDate
            });
          }
          await reviewsController.updateReview
          (
            reviewId,
            commentReviewIds,
          );
        }
      }
    }catch (e) {
        console.log('The review already exists', 3001);
    }
  }

  async createComments(commentList: any, reviewId: number) {
    try {
      const commentReviewIds = [];
      const comments = commentList.comments;
      for (let j = 0; j < comments.length; j++) {
        commentReviewIds.push(Number(comments[j].commentId));
        let commentId = Number(comments[j].commentId);
        let commentAuthor = comments[j].author;
        let commentText = comments[j].text;
        let commentDate = comments[j].commentDate;
          await commentsController.create({
          commentId, 
          commentAuthor,
          commentText,
          reviewId,
          commentDate
        });
      }
     await reviewsController.updateReview
     (
      reviewId,
      commentReviewIds,
     );
  } catch (e) {
    console.log('The comment already exists', 3002);
   }
 }
}
