// DTO data transfer object -промежуточный макет данных для маршрутизации,
// вынесен в отдельный файл для разделения кода на функциональные подмодули
export class CreateReviewDto {
    readonly reviewId: number;
    readonly reviewAuthor: string;
    readonly reviewTitle: string;
    readonly reviewText: string;
    readonly reviewDate: string;
    readonly movieKinopoiskId: number;
}