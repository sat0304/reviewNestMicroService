// DTO data transfer object -промежуточный макет данных для маршрутизации,
// вынесен в отдельный файл для разделения кода на функциональные подмодули
export class CreateReviewDto {
    reviewId: number;
    reviewAuthor: string;
    reviewTitle: string;
    reviewText: string;
    reviewDate: string;
    movieKinopoiskId: number;
}