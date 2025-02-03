import network from '../../../services/network';

// API to create a document
export const createContractApi = async (documentData, token) => {
    try {
        const response = await network.post(
            '/upload-contract',
            documentData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create document');
    }
};

// API to list documents by username
export const listContractsApi = async (token) => {
    try {
        const response = await network.get(
            '/contract',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch documents');
    }
};

// API to delete a document by ID 
export const deleteContractApi = async (filename,token) => {
    try {
        const response = await network.post(
            `/delete-contract`, 
            {
                file_name:filename,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete document');
    }
};
