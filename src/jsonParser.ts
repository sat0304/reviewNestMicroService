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
        let reviewId = Number(reviews[i].reviewId);
        let reviewAuthor = reviews[i].author;
        let reviewTitle = reviews[i].title;
        let reviewText = reviews[i].text;
        let reviewDate = reviews[i].reviewDate;
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
            let commentReviewIds = [];
            for (let j = 0; j < commentList.length; j++) {
              commentReviewIds.push(Number(commentList[j].commentId));
              let commentId = Number(commentList[j].commentId);
              let commentAuthor = commentList[j].author;
              let commentText = commentList[j].text;
              let commentDate = commentList[j].commentDate;
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
}
