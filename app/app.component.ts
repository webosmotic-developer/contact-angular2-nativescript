import { Component } from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";

import { Config } from "./shared/config";

@Component({
    selector: "main",
    template: "<page-router-outlet></page-router-outlet>"
})

export class AppComponent {
    constructor(private router:Router) {
        router.events.subscribe((event:Event) => {
            if (event instanceof NavigationEnd) {
                if (['/', '/signup'].indexOf(event.url) > -1 && Config.token) {
                    this.router.navigate(["/contacts"]);
                }
                if (['/contacts', '/contacts/add'].indexOf(event.url) > -1 && !Config.token) {
                    this.router.navigate(["/"]);
                }
            }
        });
    }
}
