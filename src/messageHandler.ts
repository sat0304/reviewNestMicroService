import { HttpStatus } from "@nestjs/common";
import { CommentsController } from "./comments/comments.controller";
import { Comment } from "./comments/comments.model";
import { CommentsService } from "./comments/comments.service";
import { ReviewList } from "./jsonParser";
import rabbitClient from "./rabbitMQ/client";
import { ReviewsController } from "./reviews/reviews.controller";
import { Review } from "./reviews/reviews.model";
import { ReviewsService } from "./reviews/reviews.service";

const reviewList = new ReviewList();


const commentsService = new CommentsService(Comment);
const commentsController = new CommentsController(commentsService);

const reviewsService = new ReviewsService(
  Review, 
  commentsService);
const reviewsController = new ReviewsController(reviewsService);


export default class MessageHandler{
  static async handle(
    routingKey: string,
    data: any,
    correlationId: string,
    replyTo: string,
  ) {
    let response = {};
    const {reviewId} = data;

    switch (routingKey) {
      case 'postReview':
        await reviewList.createReviews(data);
        response = data.entityJSON;
        break;
      case 'postComment':
        await reviewList.createComments(data, reviewId);
        response = data.comments;
        break;  
      case 'getReview': 
        response = await reviewsController.getById(reviewId);
        break;
      case 'getReviews':
        response = await reviewsController.getAllReviews();
        break;
      case 'getComment': 
        const {commentId} = data;
        response = await commentsController.getById(commentId);
        break;
      case 'getComments': 
        response = await commentsController.getAllComments();
        break;
      default: response = 0;
        break;
    }

    await rabbitClient.produce(response, correlationId, replyTo)

  }
}