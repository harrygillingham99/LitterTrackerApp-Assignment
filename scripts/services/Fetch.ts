/* 
  Fetch.ts
  A generic typed fetch wrapper used to make strongly typed web requests.
  Expanded to allow optional body and headers. Useful for passing 'Content-Type' headers etc.
*/

export default class Fetch {
    static async HttpRequest<T>(url: string, method: "GET" | "POST", body?: string, headers?: Headers): Promise<T> {
      return new Promise((resolve) => {
        fetch(url, { method: method, body: body, headers: headers })
          .then((response) => response.json())
          .then((jsonResponse) => {
            resolve(jsonResponse);
          })
          .catch((exception) => console.log("Fetch failed! " + exception));
      });
    }
  }