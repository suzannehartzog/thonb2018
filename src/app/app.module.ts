import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- import required BrowserAnimationsModule  
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
//import { BsDatepickerModule } from 'ngx-bootstrap';

// Import your library
import { CollapsibleModule } from 'angular2-collapsible'; // <-- import the module

import { AppComponent } from './app.component';
import { NavComponent } from './components/shared/navbar/navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SigninComponent } from './components/signinsignout/signin.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CustomerSignupComponent } from './components/customer-signup/customer-signup.component';
import { VendorSignupComponent } from './components/vendor-signup/vendor-signup.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { HagglingConversation } from './components/haggling-conversation/haggling-conversation.component';
import { StartHaggling } from './components/start-haggling/start-haggling.component';
import { MyHotels } from './components/my-hotels/my-hotels.component';
import { AssetRegistrationComponent } from './components/asset-registration/asset-registration.component';
import { DriverRegistrationComponent } from './components/driver-registration/driver-registration.component';
import { GuideRegistrationComponent } from './components/guide-registration/guide-registration.component';
import { PackageRegistrationComponent } from './components/package-registration/package-registration.component';
import { ShowItinRequest } from './components/show-itin-request/show-itin-request.component';
import { TripPlannerComponent } from './components/trip-planner/trip-planner.component';
import { QuoteRequestComponent } from './components/quote-request/quote-request.component';
import { GetResourceForPackage } from './components/get-resource-for-package/get-resource-for-package.component';
import { EAuctionComponent } from './components/e-auction/e-auction.component';
import { CheckoutComponent } from './components/check-out/check-out.component';
import { PaymentComponent } from './components/payment/payment.component';
import { GetResourcesForPackage } from './components/resources-for-package/resources-for-package.component';
import { CreatePackage } from './components/create-package/create-package.component';
import { HotelListingComponent } from './components/hotel-listing/hotel-listing.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';

import { SignoutComponent } from './components/signinsignout/signout.component';
import { FieldErrorDisplayComponent } from './components/display-error/field-error-display.component';

import { ApiDataService } from './services/api-data.service';
import { SharedService } from './services/shared.service';

//import { DatePicker } from './directives/datepicker/datepicker';
//import { DateTimePicker } from './directives/datetimepicker/datetimepicker';

const appRoutes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'customer-signup', component: CustomerSignupComponent},
  {path: 'vendor-signup', component: VendorSignupComponent},
  {path: 'search-result/:query', component: SearchResultComponent},
  {path: 'my-trips', component: MyTripsComponent},
  {path: 'haggling-conversation', component: HagglingConversation},
  {path: 'start-haggle', component: StartHaggling},
  {path: 'my-hotels', component: MyHotels},
  {path: 'asset-register', component: AssetRegistrationComponent},
  {path: 'driver-register', component: DriverRegistrationComponent},
  {path: 'guide-register', component: GuideRegistrationComponent},
  {path: 'package-register', component: PackageRegistrationComponent},
  {path: 'show-itin-request', component: ShowItinRequest},
  {path: 'trip-planner', component: TripPlannerComponent},
  {path: 'quote-request', component: QuoteRequestComponent},
  {path: 'resources-for-package', component: GetResourcesForPackage},
  {path: 'create-package', component: CreatePackage},
  {path: 'request-package', component: GetResourceForPackage},
  {path: 'e-auction', component: EAuctionComponent},
  {path: 'check-out', component: CheckoutComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'hotel-listing', component: HotelListingComponent},
  {path: 'hotel-details/:id', component: HotelDetailsComponent},
  {path:'signout', component: SignoutComponent},
  {path:'flight-search', component: FlightSearchComponent},
  
  {path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomepageComponent,
    SigninComponent,
    FooterComponent,
    CustomerSignupComponent,
    VendorSignupComponent,
    SearchResultComponent,
    MyTripsComponent,
    HagglingConversation,
    StartHaggling,
    MyHotels,
    AssetRegistrationComponent,
    DriverRegistrationComponent,
    GuideRegistrationComponent,
    PackageRegistrationComponent,
    ShowItinRequest,
    TripPlannerComponent,
    QuoteRequestComponent,
    GetResourcesForPackage,
    CreatePackage,
    GetResourceForPackage,
    EAuctionComponent,
    CheckoutComponent,
    PaymentComponent,
    HotelListingComponent,
    HotelDetailsComponent,
    SignoutComponent,
    FieldErrorDisplayComponent,
    FlightSearchComponent

    // DatePicker,
    // DateTimePicker
  ],
  imports: [
    HttpModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {useHash: true}), 
    BrowserAnimationsModule,
    CollapsibleModule
  ],
  providers: [ApiDataService,SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
