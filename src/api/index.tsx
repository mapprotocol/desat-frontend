import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const brcAddress = "http://34.143.247.29:8383"
const arcAddress = "http://34.143.192.212:8081"

const address = arcAddress
const type = "arc"
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

const getActivity = async (params?: any): Promise<any> => {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: `${address}/v1/${type}/getActivity`,
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

const createPutOn = async (data?: any, accessToken?: string): Promise<any> => {

    const config: AxiosRequestConfig = {
        method: 'post',
        url: `${address}/v1/${type}/createPutOn`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        data,
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

const createPutOff = async (data?: any, accessToken?: string): Promise<any> => {

    const config: AxiosRequestConfig = {
        method: 'post',
        url: `${address}/v1/${type}/createPutOff`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        data,
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

const listToken = async (data?: any, accessToken?: string): Promise<any> => {

    const config: AxiosRequestConfig = {
        method: 'post',
        url: `${address}/v1/${type}/listToken`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        data,
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


const getTransferableInscription = async (params?: any): Promise<any> => {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: `${address}/v1/${type}/getTransferableInscription`,
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
const getTokenInfo = async (params?: any): Promise<any> => {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: `${address}/v1/${type}/getTokenInfo`,
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

const getAddressToken = async (params?: any): Promise<any> => {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: `${address}/v1/${type}/getAddressToken`,
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


const signInPrepare = async (params?: any): Promise<any> => {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: `${address}/v1/${type}/signInPrepare`,
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


const signIn = async (data?: any): Promise<any> => {
    const config: AxiosRequestConfig = {
        method: 'post',
        url: `${address}/v1/${type}/signIn`,
        data,
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

const createBidPrepare = async (data: any) => {
    const config: AxiosRequestConfig = {
        method: 'post',
        url: `${address}/v1/${type}/createBidPrepare`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        data,
    };

    try {
        const response: AxiosResponse<any> = await axios(config);
        return response.data;
    } catch (error) {
        // 处理错误
        console.error(error);
        throw error;
    }
}

const createBid = async (data: any) => {
    const config: AxiosRequestConfig = {
        method: 'post',
        url: `${address}/v1/${type}/createBid`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        data,
    };

    try {
        const response: AxiosResponse<any> = await axios(config);
        return response.data;
    } catch (error) {
        // 处理错误
        console.error(error);
        throw error;
    }
}

const placeOrder = async (data: any) => {
    const config: AxiosRequestConfig = {
        method: 'post',
        url: `${address}/v1/${type}/placeOrder`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        data,
    };

    try {
        const response: AxiosResponse<any> = await axios(config);
        return response.data;
    } catch (error) {
        // 处理错误
        console.error(error);
        throw error;
    }

}

const cancelListToken = async (data: any) => {
    const config: AxiosRequestConfig = {
        method: 'post',
        url: `${address}/v1/${type}/cancelListToken`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        data,
    };

    try {
        const response: AxiosResponse<any> = await axios(config);
        return response.data;
    } catch (error) {
        // 处理错误
        console.error(error);
        throw error;
    }

}

const createModifyPrice = async (data: any) => {
    const config: AxiosRequestConfig = {
        method: 'post',
        url: `${address}/v1/${type}/createModifyPrice`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        data,
    };

    try {
        const response: AxiosResponse<any> = await axios(config);
        return response.data;
    } catch (error) {
        // 处理错误
        console.error(error);
        throw error;
    }

}

const updateListToken = async (data: any) => {
    const config: AxiosRequestConfig = {
        method: 'post',
        url: `${address}/v1/${type}/updateListToken`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        data,
    };

    try {
        const response: AxiosResponse<any> = await axios(config);
        return response.data;
    } catch (error) {
        // 处理错误
        console.error(error);
        throw error;
    }

}

export {
    getTotalInfo,
    getTokens,
    getOrders,
    createPutOn,
    getTransferableInscription,
    signInPrepare,
    signIn,
    listToken,
    createBidPrepare,
    createBid,
    placeOrder,
    getActivity,
    createPutOff,
    cancelListToken,
    createModifyPrice,
    updateListToken,
    getAddressToken,
    getTokenInfo,
};
