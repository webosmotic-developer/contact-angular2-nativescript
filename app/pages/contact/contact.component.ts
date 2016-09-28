import { Component, NgZone, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Config } from "../../shared/config";
import { Contact } from "../../shared/contact/contact";
import { ContactService } from "../../shared/contact/contact.service";

@Component({
    selector: "contacts",
    templateUrl: "pages/contact/contact.html",
    styleUrls: ["pages/contact/contact.css"],
    providers: [ContactService]
})

export class ContactComponent implements OnInit {
    contact:Contact;
    contactList:Array<Contact> = [];
    isLoading = false;
    listLoaded = false;

    constructor(private router:Router, private contactService:ContactService, private zone:NgZone) {
        this.contact = new Contact();
        this.contact.name = "";
    }

    ngOnInit() {
        this.isLoading = true;
        this.contactService.load()
            .subscribe(data => {
                data.forEach((obj) => {
                    this.contactList.unshift(obj);
                });
                this.isLoading = false;
                this.listLoaded = true;
            });
    }

    delete(contact:Contact) {
        this.contactService.delete(contact._id)
            .subscribe(() => {
                // Running the array splice in a zone ensures that change detection gets triggered.
                this.zone.run(() => {
                    var index = this.contactList.indexOf(contact);
                    this.contactList.splice(index, 1);
                });
            });
    }

    logout() {
        Config.token = "";
        this.router.navigate([""]);
    }
}