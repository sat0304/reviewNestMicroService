import { CommentsController } from "./comments/comments.controller";
import { Comment } from "./comments/comments.model";
import { CommentsService } from "./comments/comments.service";
import { ReviewList } from "./jsonParser";
// import { LoaderToDatabase } from "./putterToDatabase";
import rabbitClient from "./rabbitMQ/client"
import { ReviewsController } from "./reviews/reviews.controller";
import { Review } from "./reviews/reviews.model";
import { ReviewsService } from "./reviews/reviews.service";

const reviewList = new ReviewList();
// const loaderToDatabase = new LoaderToDatabase(reviewList);

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

        console.log('the nameOfRoutingKey is ', routingKey);

        switch (routingKey) {
            case 'postReview':

            await reviewList.createReviews(data);
            // console.log('The review is...', reviewList.commentTexts);

            response = 'New review is created';
            break;
            case 'getReview': 
            const {nameOfRoutingKey} = data;
            response = 'get particular review';
            break;
            case 'getReviews': response = 'get all reviews';
            break;
            default: response = 0;
            break;
        }

        await rabbitClient.produce(response, correlationId, replyTo)

    }
}