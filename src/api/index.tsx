import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const address = "http://34.143.247.29:8383"
const arcAddress = "http://34.143.192.212:8081"
const type = "brc"
// QueryDateParams

const getTotalInfo = async (params?: any): Promise<any> => {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: `${address}/v1/${type}/getTotalInfo`,
        params,
    };

    try {
        const response: AxiosResponse<any> = await axios(config);
        return response.data;
    } catch (error) {
        // 处理错误
        console.error(error);
        throw error;
    }
};

const getTokens = async (params?: any): Promise<any> => {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: `${address}/v1/${type}/getTokens`,
        params,
    };

    try {
        const response: AxiosResponse<any> = await axios(config);
        return response.data;
    } catch (error) {
        // 处理错误
        console.error(error);
        throw error;
    }
};

const getOrders = async (params?: any): Promise<any> => {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: `${address}/v1/${type}/getOrders`,
        params,
    };

    try {
        const response: AxiosResponse<any> = await axios(config);
        return response.data;
    } catch (error) {
        // 处理错误
        console.error(error);
        throw error;
    }
};


export {
    getTotalInfo,
    getTokens,
    getOrders
};
