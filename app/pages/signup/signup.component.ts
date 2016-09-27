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
    selector: "signup",
    providers: [UserService],
    templateUrl: "pages/signup/signup.html",
    styleUrls: ["pages/signup/signup-common.css"],
})
export class SignUpComponent implements OnInit {
    user:User;

    constructor(private router:Router, private userService:UserService, private page:Page) {
        this.user = new User();
        this.user.name = "";
        this.user.email = "";
        this.user.password = "";
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = this.page.ios ? "res://bg_login.jpg" : "res://bg_login";
    }

    submit() {
        if (this.user.name === "") {
            alert("Name is required.");
            return;
        }

        if (!this.user.isValidEmail()) {
            alert("Enter a valid email address.");
            return;
        }

        if (this.user.password === "") {
            alert("Password is required.");
            return;
        }

        this.signUp();
    }


    signUp() {
        this.userService.register(this.user)
            .subscribe(
            () => {
                alert("Your account was successfully created.");
            },
            (error) => alert(error._body.message)
        );
    }

    navigate() {
        this.router.navigate([""]);
    }
}
