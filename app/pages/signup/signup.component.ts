import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Color } from "color";
import { Page } from "ui/page";

import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";

@Component({
    selector: "signup",
    providers: [UserService],
    templateUrl: "pages/signup/signup.html",
    styleUrls: ["pages/signup/signup-common.css"],
})

export class SignUpComponent implements OnInit {
    user:User;
    confirmPassword = "";

    constructor(private router:Router, private userService:UserService, private page:Page) {
        this.user = new User();
        this.user.name = "";
        this.user.email = "";
        this.user.password = "";
    }

    ngOnInit() {
        this.page.backgroundColor = new Color("#00aeac");
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

        if (this.confirmPassword === "") {
            alert("Confirm Password is required.");
            return;
        }

        if (this.user.password !== this.confirmPassword) {
            alert("Password doesn't match.");
            return;
        }

        this.signUp();
    }


    signUp() {
        this.userService.register(this.user)
            .subscribe(
            () => {
                alert("Your account was successfully created.");
                this.navigate();
            },
            (error) => {
                for (var field in error._body.errors) {
                    if(error._body.errors.hasOwnProperty(field)){
                        var value = error._body.errors[field];
                        alert(value.message);
                    }
                }
            }
        );
    }

    navigate() {
        this.router.navigate([""]);
    }
}
