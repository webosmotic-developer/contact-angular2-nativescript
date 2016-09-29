import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Color } from "color";
import { Page } from "ui/page";

import { Config } from "../../shared/config";
import { Contact } from "../../shared/contact/contact";
import { ContactService } from "../../shared/contact/contact.service";

@Component({
    selector: "add-contact",
    providers: [ContactService],
    templateUrl: "pages/contact/addContact.html",
    styleUrls: ["pages/contact/contact.css"],
})

export class AddContactComponent implements OnInit {
    contact:Contact;
    contactId = "";

    constructor(private router:Router, private route:ActivatedRoute, private contactService:ContactService, private page:Page) {
        this.contact = new Contact();
        this.contact.name = "";
        this.contact.email = "";
        this.contact.phone = "";
    }

    ngOnInit() {
        this.page.backgroundColor = new Color("#00aeac");
        this.route.params.forEach((params:Params) => {
            this.contactId = params['id'];
            if (this.contactId !== 'add') {
                this.contactService.get(this.contactId)
                    .subscribe(data => {
                        this.contact._id = data._id;
                        this.contact.name = data.name;
                        this.contact.email = data.email;
                        this.contact.phone = data.phone;
                    });
            }
        });
    }

    submit() {
        if (this.contact.name === "") {
            alert("Contact name is required.");
            return;
        }

        if (!this.contact.isValidEmail()) {
            alert("Enter a valid email address.");
            return;
        }

        if (this.contact.phone === "") {
            alert("Phone is required.");
            return;
        }

        if (this.contactId === 'add') {
            this.contactService.add(this.contact)
                .subscribe(
                    obj => {
                    this.router.navigate(["/contacts"]);
                },
                () => {
                    alert({
                        message: "An error occurred while adding an item to your contact list.",
                        okButtonText: "OK"
                    });
                }
            )
        } else {
            this.contactService.update(this.contact)
                .subscribe(
                    obj => {
                    this.router.navigate(["/contacts"]);
                },
                () => {
                    alert({
                        message: "An error occurred while adding an item to your contact list.",
                        okButtonText: "OK"
                    });
                }
            )
        }
    }

    logout() {
        Config.token = "";
        this.router.navigate([""]);
    }
}
