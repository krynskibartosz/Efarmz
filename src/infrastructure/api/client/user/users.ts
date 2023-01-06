import { ApiPort } from 'src/ports/api';
import { DELIVERY_OPTIONS_RESPONSE } from '../../../../core/domains/models/user/schema/deliveryOptions';

export class UserService {
    api: ApiPort;

    constructor(api: ApiPort) {
        this.api = api;
    }

    async getUserDeliveryDates(
        zipCode: string
    ): Promise<DELIVERY_OPTIONS_RESPONSE> {
        const response = await this.api.get<DELIVERY_OPTIONS_RESPONSE>(
            `/deliverydates/${zipCode}`
        );
        return response;
    }
}
