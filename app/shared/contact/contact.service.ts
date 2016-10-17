import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Config } from "../config";
import { Contact } from "./contact";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable()
export class ContactService {
    constructor(private http:Http) {
    }

    load() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + Config.token);

        return this.http.get(Config.apiUrl + "/api/users/" + Config.user._id + "/contacts", {headers: headers})
            .map(res => res.json())
            .map(data => {
                return data;
            })
            .catch(this.handleErrors);
    }

    get(id:string) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + Config.token);

        return this.http.get(Config.apiUrl + "/api/contacts/" + id, {headers: headers})
            .map(res => res.json())
            .map(data => {
                return data;
            })
            .catch(this.handleErrors);
    }

    add(contact:Contact) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + Config.token);

        return this.http.post(Config.apiUrl + "/api/contacts", {
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            userId: Config.user._id
        }, {headers: headers})
            .map(res => res.json())
            .map(data => {
                return data;
            })
            .catch(this.handleErrors);
    }

    update(contact:Contact) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + Config.token);

        return this.http.put(Config.apiUrl + "/api/contacts/" + contact._id, {
            name: contact.name,
            email: contact.email,
            phone: contact.phone
        }, {headers: headers})
            .map(res => res.json())
            .map(data => {
                return data;
            })
            .catch(this.handleErrors);
    }

    delete(id:string) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + Config.token);

        return this.http.delete(
            Config.apiUrl + "/api/contacts/" + id,
            {headers: headers}
        ).map(res => res.json()).catch(this.handleErrors);
    }

    handleErrors(error:Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}