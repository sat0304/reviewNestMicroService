import rabbitClient from "./rabbitMQ/client"

export default class MessageHandler{
    static async handle(
        routingKey: string,
        data: any,
        correlationId: string,
        replyTo: string,
    ) {
        let response = {};

        const {nameOfRoutingKey} = data;

        console.log('the nameOfRoutingKey is ', routingKey);

        switch (routingKey) {
            case 'postReview': response = `post review action ${nameOfRoutingKey}`;
            break;
            case 'getReviews': response = 'get all reviews';
            break;
            default: response = 0;
            break;
        }

        await rabbitClient.produce(response, correlationId, replyTo)

    }
}