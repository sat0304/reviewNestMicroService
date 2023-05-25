import { BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table } from "sequelize-typescript";
import { Review } from "../reviews/reviews.model";


@Table({ tableName: 'comment', createdAt: false, updatedAt: false })
export class Comment extends Model<Comment> {

@Column({ type: DataType.INTEGER, 
   unique: true,
   primaryKey: true})
commentId: number;

@Column({ type: DataType.STRING(64), allowNull: false})
commentAuthor: string;

@Column({ type: DataType.STRING(1024) })
commentText: string;

@Column({ type: DataType.STRING(64) })
commentDate: string;

@BelongsTo( () => Review)
review: Review;

@ForeignKey(() => Review)
@Column({type: DataType.INTEGER})
reviewId: number;
}
