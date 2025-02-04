
import network from '../../../services/network';


export const scheduleInvoiceApi = async (invoiceData, token) => {
    const response = await network.post('/schedule-invoice', invoiceData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const getSchedulesApi = async (token,email) => {
    const response = await network.get(`/get-schedules?customerEmail=${email}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};