class APIUtils
{
    constructor(apiContext, loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
    async getLoginToken(){
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',{data: this.loginPayload});
        //expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJSON = await loginResponse.json();
        const tokenId = loginResponseJSON.token;
        console.log(tokenId);
        return tokenId;
    }

    async createOrder(orderPayload){
        let response = {};
        response.token = await this.getLoginToken();
        const createOrderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
    {
        data: orderPayload,
        headers:{
            'Authorization': response.token,
            'Content-Type': 'application/json'
        },
    });
    //expect(createOrderResponse.ok()).toBeTruthy();
    const createOrderJSON = await createOrderResponse.json();
    const orderId = createOrderJSON.orders[0];
    response.orderId = orderId;
    return response;
    }
}
module.exports = {APIUtils};