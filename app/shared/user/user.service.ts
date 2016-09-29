import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { User } from "./user";
import { Config } from "../config";

@Injectable()
export class UserService {
    constructor(private http:Http) {
    }

    register(user:User) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http.post(
            Config.apiUrl + "/api/users",
            {
                name: "Test User",
                email: user.email,
                password: user.password
            },
            {headers: headers}
        ).catch(this.handleErrors);
    }

    login(user:User) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http.post(Config.apiUrl + "/auth/local", {
                email: user.email,
                password: user.password
            },
            {headers: headers})
            .map(response => response.json())
            .do(data => {
                Config.token = data.token;
                Config.user = data.user;
            })
            .catch(this.handleErrors);
    }

    handleErrors(error:Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}