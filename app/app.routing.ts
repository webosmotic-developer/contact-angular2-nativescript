import { LoginComponent } from "./pages/login/login.component";
import { SignUpComponent } from "./pages/signup/signup.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { AddContactComponent } from "./pages/contact/add.contact.component";


export const routes = [
  { path: "", component: LoginComponent },
  { path: "signup", component: SignUpComponent },
  { path: "contacts", component: ContactComponent },
  { path: "contacts/:id", component: AddContactComponent }
];

export const navigatableComponents = [
  LoginComponent,
  SignUpComponent,
  ContactComponent,
  AddContactComponent
];
