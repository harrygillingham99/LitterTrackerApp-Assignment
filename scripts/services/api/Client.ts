/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.9.4.0 (NJsonSchema v10.3.1.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import {ApiUrl} from '../config/ApiConfig'
export class AuthorizedApiBase {
  private readonly config: IConfig;

  protected constructor(config: IConfig) {
    this.config = config;
  }

  protected transformOptions = (options: RequestInit): Promise<RequestInit> => {
    options.headers = {
      ...options.headers,
      Authorization: this.config.JwtToken
    };
    return Promise.resolve(options);
  };

  protected getBaseUrl = (defaultUrl: string, baseUrl?: string) => {
    return ApiUrl !== undefined ? ApiUrl : defaultUrl 
  }
}

export class LitterTrackerAppClient extends AuthorizedApiBase {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(configuration: IConfig, baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        super(configuration);
        this.http = http ? http : <any>window;
        this.baseUrl = this.getBaseUrl("https://localhost:44307", baseUrl);
    }

    /**
     * @return Success
     */
    getLitterPins(): Promise<LitterPin[]> {
        let url_ = this.baseUrl + "/app/all-pins";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processGetLitterPins(_response);
        });
    }

    protected processGetLitterPins(response: Response): Promise<LitterPin[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(LitterPin.fromJS(item));
            }
            return result200;
            });
        } else if (status === 401) {
            return response.text().then((_responseText) => {
            return throwException("Unauthorized Request", status, _responseText, _headers);
            });
        } else if (status === 500) {
            return response.text().then((_responseText) => {
            return throwException("Server Error", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<LitterPin[]>(<any>null);
    }

    /**
     * @return Success
     */
    createNewLitterPin(request: LitterPin): Promise<FileResponse> {
        let url_ = this.baseUrl + "/app/pin";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_ = <RequestInit>{
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processCreateNewLitterPin(_response);
        });
    }

    protected processCreateNewLitterPin(response: Response): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
            const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status === 401) {
            return response.text().then((_responseText) => {
            return throwException("Unauthorized Request", status, _responseText, _headers);
            });
        } else if (status === 500) {
            return response.text().then((_responseText) => {
            return throwException("Server Error", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse>(<any>null);
    }
}

export abstract class DataStoreItem implements IDataStoreItem {
    dataStoreId?: number;

    constructor(data?: IDataStoreItem) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.dataStoreId = _data["dataStoreId"];
        }
    }

    static fromJS(data: any): DataStoreItem {
        data = typeof data === 'object' ? data : {};
        throw new Error("The abstract class 'DataStoreItem' cannot be instantiated.");
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["dataStoreId"] = this.dataStoreId;
        return data; 
    }
}

export interface IDataStoreItem {
    dataStoreId?: number;
}

export class LitterPin extends DataStoreItem implements ILitterPin {
    markerLocation?: LatLng | undefined;
    imageUrls?: string[] | undefined;
    createdByUid?: string | undefined;

    constructor(data?: ILitterPin) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.markerLocation = _data["markerLocation"] ? LatLng.fromJS(_data["markerLocation"]) : <any>undefined;
            if (Array.isArray(_data["imageUrls"])) {
                this.imageUrls = [] as any;
                for (let item of _data["imageUrls"])
                    this.imageUrls!.push(item);
            }
            this.createdByUid = _data["createdByUid"];
        }
    }

    static fromJS(data: any): LitterPin {
        data = typeof data === 'object' ? data : {};
        let result = new LitterPin();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["markerLocation"] = this.markerLocation ? this.markerLocation.toJSON() : <any>undefined;
        if (Array.isArray(this.imageUrls)) {
            data["imageUrls"] = [];
            for (let item of this.imageUrls)
                data["imageUrls"].push(item);
        }
        data["createdByUid"] = this.createdByUid;
        super.toJSON(data);
        return data; 
    }
}

export interface ILitterPin extends IDataStoreItem {
    markerLocation?: LatLng | undefined;
    imageUrls?: string[] | undefined;
    createdByUid?: string | undefined;
}

export class LatLng implements ILatLng {
    latitude?: number;
    longitude?: number;

    constructor(data?: ILatLng) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.latitude = _data["latitude"];
            this.longitude = _data["longitude"];
        }
    }

    static fromJS(data: any): LatLng {
        data = typeof data === 'object' ? data : {};
        let result = new LatLng();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["latitude"] = this.latitude;
        data["longitude"] = this.longitude;
        return data; 
    }
}

export interface ILatLng {
    latitude?: number;
    longitude?: number;
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}

/**
 * Configuration class needed in base class.
 * The config is provided to the API client at initialization time.
 * API clients inherit from #AuthorizedApiBase and provide the config.
 */
export class IConfig {
  constructor(token : string){
    this.JwtToken = token
  }
  /**
   * Returns a valid value for the Authorization header.
   * Used to dynamically inject the current auth header.
   */
  JwtToken: string;
}