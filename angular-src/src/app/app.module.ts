// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Custom Modules
import { MessageModule } from './modules/message/message.module';
import { PaginationModule } from './modules/pagination/pagination.module';
import { BackToTopModule } from './modules/back-to-top/back-to-top.module';
import { LoadingModule } from './modules/loading/loading.module';
import { PictureModule } from './modules/picture/picture.module';
import { FileInputModule } from './modules/file-input/file-input.module';

// Extra Modules
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgSelectModule } from '@ng-select/ng-select';
import { TextMaskModule } from 'angular2-text-mask';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { ProductFormComponent } from './components/forms/product-form/product-form.component';
import { CategoryFormComponent } from './components/forms/category-form/category-form.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminProductsComponent } from './pages/members/admin/admin-products/admin-products.component';
import { AboutComponent } from './components/about/about.component';
import { StoreCountComponent } from './components/store-count/store-count.component';
import { StoreCountItemComponent } from './components/store-count/store-count-item/store-count-item.component';
import { ShoppingMessageComponent } from './components/shopping-message/shopping-message.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemComponent } from './components/product-list/product-item/product-item.component';
import { ErrorPageComponent } from './components/errors/error-page/error-page.component';
import { ErrorFormComponent } from './components/errors/error-form/error-form.component';
import { MembersComponent } from './pages/members/members.component';
import { CustomerComponent } from './pages/members/customer/customer.component';
import { AdminComponent } from './pages/members/admin/admin.component';
import { CustomerProductsComponent } from './pages/members/customer/customer-products/customer-products.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';
import { OrderFormComponent } from './components/forms/order-form/order-form.component';
import { CheckoutComponent } from './pages/members/customer/checkout/checkout.component';

// Services
import { ValidationService } from './services/validation/validation.service';
import { AuthService } from './services/auth/auth.service';
import { OverallService } from './services/overall/overall.service';
import { ProductService } from './services/product/product.service';
import { CategoryService } from './services/category/category.service';
import { ActionService } from './services/action/action.service';
import { CartService } from './services/cart/cart.service';
import { ItemService } from './services/item/item.service';
import { OrderService } from './services/order/order.service';

// Pipes
import { SearchPipe } from './pipes/search/search.pipe';
import { CapitalizePipe } from './pipes/capitalize/capitalize.pipe';
import { UcwordsPipe } from './pipes/ucwords/ucwords.pipe';
import { DefaultPipe } from './pipes/default/default.pipe';
import { TruncatePipe } from './pipes/truncate/truncate.pipe';
import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';

// Directives
import { DefaultImageDirective } from './directives/default-image/default-image.directive';

// Interceptores
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';

// Guards
import { AuthGuard } from './guards/auth/auth.guard';
import { CustomerGuard } from './guards/customer/customer.guard';
import { AdminGuard } from './guards/admin/admin.guard';

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
    SafeHtmlPipe,
    HeaderComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProductFormComponent,
    CategoryFormComponent,
    RegisterComponent,
    AdminProductsComponent,
    AboutComponent,
    StoreCountComponent,
    StoreCountItemComponent,
    ShoppingMessageComponent,
    NotificationComponent,
    ProductListComponent,
    ProductItemComponent,
    MembersComponent,
    CustomerComponent,
    AdminComponent,
    CustomerProductsComponent,
    CartComponent,
    CartItemComponent,
    OrderFormComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    RouterModule,
    HttpClientModule,
    MessageModule.forRoot(),
    PaginationModule.forRoot(),
    BackToTopModule.forRoot(),
    LoadingModule.forRoot(),
    PictureModule.forRoot(),
    FileInputModule.forRoot(),
    ModalModule.forRoot(),
    InfiniteScrollModule,
    BsDatepickerModule.forRoot(),
    TextMaskModule
  ],
  providers: [
    ValidationService,
    AuthService,
    OverallService,
    ProductService,
    CategoryService,
    ActionService,
    CartService,
    ItemService,
    OrderService,
    AuthGuard,
    CustomerGuard,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
