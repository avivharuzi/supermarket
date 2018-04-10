// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Custom Modules
import { MessageModule } from './shared/modules/message/message.module';
import { PaginationModule } from './shared/modules/pagination/pagination.module';
import { BackToTopModule } from './shared/modules/back-to-top/back-to-top.module';
import { LoadingModule } from './shared/modules/loading/loading.module';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './shared/pages/home/home.component';
import { ErrorPageComponent } from './shared/components/errors/error-page/error-page.component';
import { ErrorFormComponent } from './shared/components/errors/error-form/error-form.component';

// Services
import { ValidationService } from './shared/services/validation/validation.service';

// Pipes
import { SearchPipe } from './shared/pipes/search/search.pipe';
import { CapitalizePipe } from './shared/pipes/capitalize/capitalize.pipe';
import { UcwordsPipe } from './shared/pipes/ucwords/ucwords.pipe';
import { DefaultPipe } from './shared/pipes/default/default.pipe';
import { TruncatePipe } from './shared/pipes/truncate/truncate.pipe';
import { SafeHtmlPipe } from './shared/pipes/safe-html/safe-html.pipe';

// Directives
import { DefaultImageDirective } from './shared/directives/default-image/default-image.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorFormComponent,
    ErrorPageComponent,
    DefaultImageDirective,
    CapitalizePipe,
    SearchPipe,
    UcwordsPipe,
    DefaultPipe,
    TruncatePipe,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    RouterModule,
    HttpClientModule,
    MessageModule.forRoot(),
    PaginationModule.forRoot(),
    BackToTopModule.forRoot(),
    LoadingModule.forRoot()
  ],
  providers: [
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
