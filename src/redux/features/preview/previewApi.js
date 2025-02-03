
import network from '../../../services/network';


export const invoicePreviewApi = async (filename,token) => {
    try {
        const response = await network.post(
            `/invoice-preview`, 
            {
                file_name:filename,                         
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log('Invoice preview response:', response.data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to preview invoice');
    }
};

export const updateInvoiceDetailsApi = async (invoiceData, token) => {
    try {
        const response = await network.post(
            `/create_invoice`,invoiceData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log('Invoice update response:', response.data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update invoice');
    }
};

export const generateInvoiceApi = async (filename, token) => {
    try {
        const response = await network.post(
            `/contract`,
            {
                file_name:filename,                         
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log('Invoice generate response:', response.data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to generate invoice');
    }
};
