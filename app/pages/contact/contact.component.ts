import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { TextField } from "ui/text-field";
import { Router } from "@angular/router";

import { Config } from "../../shared/config";
import { Contact } from "../../shared/contact/contact";
import { ContactService } from "../../shared/contact/contact.service";

@Component({
    selector: "contact",
    templateUrl: "pages/contact/contact.html",
    styleUrls: ["pages/contact/contact.css"],
    providers: [ContactService]
})

export class ContactComponent implements OnInit {
    contact:Contact;
    contactList:Array<Contact> = [];
    isLoading = false;
    listLoaded = false;

    @ViewChild("contactTextField") contactTextField:ElementRef;

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

    add() {
        if (this.contact.name === "") {
            alert("Enter a contact item");
            return;
        }

        // Dismiss the keyboard
        let textField = <TextField>this.contactTextField.nativeElement;
        textField.dismissSoftInput();

        this.contactService.add(this.contact)
            .subscribe(
                obj => {
                this.contactList.unshift(obj);
            },
            () => {
                alert({
                    message: "An error occurred while adding an item to your list.",
                    okButtonText: "OK"
                });
            }
        )
    }

    delete(contact: Contact) {
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