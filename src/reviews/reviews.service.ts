import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './reviews.model';
import { CommentsService } from '../comments/comments.service';
import { CreateReviewDto } from './dto/createReviewDto';

@Injectable()
export class ReviewsService {

    constructor(
        @InjectModel(Review) private reviewRepo: typeof Review,
        private commentsService: CommentsService) {}
    
    async createReview( dto: CreateReviewDto ) {
        const review = await this.reviewRepo.create(dto);
        return review;
    }
    
    async getReviewById( reviewId: number ) {
        const review = await this.reviewRepo.findOne({where: { reviewId }});
        return review;
    }
    
    async getAllReviews() {
        // const Reviews = await this.ReviewRepo.findAll();
        const reviews = await this.reviewRepo.findAll({ include: { all: true }});
        return reviews;
      }

    async updateCommentInReview( 
        reviewId: number, 
        commentIds: number[] ) {
        const review = await this.reviewRepo.findOne(
            { where: { reviewId }});
    
        for (let i = 0; i < commentIds.length; i++) {
            let comment = await this.commentsService.getCommentById(
                commentIds[i]);
            await review.$add( 'comments', [comment.commentId] );
        }
        return review;
    }
}
