import apiClient from "./config";
import { CLIENT_TYPE } from "../constants/clientType";

// Always send x-client-type header for seller APIs
export const createSeller = (businessName, contactEmail) =>
    apiClient.post(
        "/api/sellers/create",
        { businessName, contactEmail },
        {
            headers: {
                "x-client-type": CLIENT_TYPE
            }
        }
    );

export const fetchSellerProfile = () =>
    apiClient.get(
        "/api/sellers/me",
        {
            headers: {
                "x-client-type": CLIENT_TYPE
            }
        }
    );
