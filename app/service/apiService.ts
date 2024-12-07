import { getAccessToken } from "../lib/actions";

const apiService = {
  get: async function <T>(
    url: string,
    accept?: string,
    contentType?: string
  ): Promise<{ status: number; data: T }> {

    const tokenId = await getAccessToken();
    
    return new Promise<{ status: number; data: T }>((resolve, reject) => {
      const headers: { [key: string]: string } = {};
      if (tokenId) {
        headers["Authorization"] = `Bearer ${tokenId}`;
      }
      if (accept) {
        headers["Accept"] = accept;
      }
      if (contentType) {
        headers["Content-Type"] = contentType;
      }

      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "GET",
        headers: headers,
      })
        .then((response) => {
          const status = response.status;
          response
            .json()
            .then((data) => {
              resolve({ status, data }); // Retorna o status junto com os dados
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  post: async function (
    url: string,
    data: any,
    contentType?: any,
    accept?: any
  ): Promise<any> {

    const headers: { [key: string]: string } = {};
    const tokenId = await getAccessToken();
    if (tokenId) {
      headers["Authorization"] = `Bearer ${tokenId}`;
    }
    if (contentType) {
      headers["Content-Type"] = contentType;
    }
    if (accept) {
      headers["Accept"] = accept;
    }

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "POST",
        body: data,
        headers: headers,
      })
        .then((response) => response.json())
        .then((json) => {

          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default apiService;
