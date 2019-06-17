import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ClientsListComponent} from './modules/client/pages/clients-list/clients-list.component';
import { ModalWindowComponent } from './shared/components/modal-window/modal-window.component';
import { FileUploaderComponent } from './shared/components/file-uploader/file-uploader.component';
import { ClientFormComponent } from './modules/client/components/client-form/client-form.component';
import { AccountFormComponent } from './modules/client/components/account-form/account-form.component';
import { SearchComponent } from './shared/components/search/search.component';
import { MainRoutingModule } from './main-routing.module';
import { WelcomeComponent } from './shared/pages/welcome/welcome.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientsListComponent,
    ModalWindowComponent,
    FileUploaderComponent,
    ClientFormComponent,
    AccountFormComponent,
    SearchComponent,
    WelcomeComponent,
    FooterComponent,
    NotFoundComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MainRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
