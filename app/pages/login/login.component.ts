import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Color } from "color";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { View } from "ui/core/view";

import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { setHintColor } from "../../utils/hint-util";

@Component({
    selector: "login",
    providers: [UserService],
    templateUrl: "pages/login/login.html",
    styleUrls: ["pages/login/login-common.css"],
})

export class LoginComponent implements OnInit {
    user:User;

    constructor(private router:Router, private userService:UserService, private page:Page) {
        this.user = new User();
        this.user.email = "test@test.com";
        this.user.password = "test";
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.page.backgroundColor = new Color("#00aeac");
    }

    submit() {
        if (!this.user.isValidEmail()) {
            alert("Enter a valid email address.");
            return;
        }

        if (this.user.password === "") {
            alert("Password is required.");
            return;
        }

        this.login();
    }

    login() {
        this.userService.login(this.user)
            .subscribe(
            () => this.router.navigate(["/contacts"]),
            (error) => alert(error._body.message)
        );
    }

    navigate() {
        this.router.navigate(["/signup"])
    }
}
