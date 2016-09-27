import { LoginComponent } from "./pages/login/login.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { SignUpComponent } from "./pages/signup/signup.component";

export const routes = [
  { path: "", component: LoginComponent },
  { path: "signup", component: SignUpComponent },
  { path: "contacts", component: ContactComponent }
];

export const navigatableComponents = [
  LoginComponent,
  SignUpComponent,
  ContactComponent
];
