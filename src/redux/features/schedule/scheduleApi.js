
import network from '../../../services/network';


export const scheduleInvoiceApi = async (invoiceData, token) => {
    const response = await network.post('/schedule-invoice', invoiceData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};