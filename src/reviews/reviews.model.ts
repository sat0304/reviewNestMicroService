import { 
    Column,
    DataType,
    HasMany,
    Model,
    Table } from "sequelize-typescript";
import { Comment } from "../comments/comments.model";


@Table({ tableName: 'review', createdAt: false, updatedAt: false })
export class Review extends Model<Review> {

@Column({ type: DataType.INTEGER, 
   unique: true,
   primaryKey: true})
reviewId: number;

@Column({ type: DataType.STRING(64), allowNull: false })
reviewAuthor: string;

@Column({ type: DataType.STRING(64) })
reviewTitle: string;

@Column({ type: DataType.STRING(1024) })
reviewText: string;

@Column({ type: DataType.STRING(64) })
reviewDate: string;

@Column({ type: DataType.INTEGER})
movieKinopoiskId: number;

@HasMany(() => Comment)
comments: Comment[];

}