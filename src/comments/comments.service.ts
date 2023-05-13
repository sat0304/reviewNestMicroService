import { Injectable } from '@nestjs/common';
import { Comment } from './comments.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDto } from './dto/createCommentDto';

@Injectable()
export class CommentsService {    
    
  constructor(
    @InjectModel(Comment) private commentRepo: typeof Comment) {}

  async createComment( dto: CreateCommentDto ) {
    const comment = await this.commentRepo.create(dto);
    return comment;
}

async getCommentById(commentId: number ) {
    const comment = await this.commentRepo.findOne({where: { commentId }});
    return comment;
}

async getAllComments() {
    // const comments = await this.commentRepo.findAll();
    const comments = await this.commentRepo.findAll({ include: { all: true }});
    return comments;
  }
}
