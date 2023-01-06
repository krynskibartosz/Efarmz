import { DELIVERY_OPTIONS_RESPONSE } from 'src/core/domains/models/user/schema/mod_deliveryOptions';
import { UserApiPort } from 'src/ports/user-port';

export class UserService {
    api: UserApiPort;

    constructor(api: UserApiPort) {
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
