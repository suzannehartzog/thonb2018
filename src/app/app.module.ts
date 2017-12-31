import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- import required BrowserAnimationsModule  
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Import your library
import { CollapsibleModule } from 'angular2-collapsible'; // <-- import the module

import { AppComponent } from './app.component';
import { NavComponent } from './components/shared/navbar/navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SigninComponent } from './components/signin/signin.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CustomerSignupComponent } from './components/customer-signup/customer-signup.component';
import { VendorSignupComponent } from './components/vendor-signup/vendor-signup.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { ItineraryConversation } from './components/itinerary-conversation/itinerary-conversation.component';
import { ItineraryRequest } from './components/itinerary-request/itinerary-request.component';
import { MyHotels } from './components/my-hotels/my-hotels.component';
import { AssetRegistrationComponent } from './components/asset-registration/asset-registration.component';
import { DriverRegistrationComponent } from './components/driver-registration/driver-registration.component';
import { GuideRegistrationComponent } from './components/guide-registration/guide-registration.component';
import { PackageRegistrationComponent } from './components/package-registration/package-registration.component';
import { ShowQuoteResponseComponent } from './components/show-quote-response/show-quote-response.component';
import { TripPlannerComponent } from './components/trip-planner/trip-planner.component';
import { QuoteRequestComponent } from './components/quote-request/quote-request.component';
import { CreateItineraryComponent } from './components/create-itinerary/create-itinerary.component';
import { EAuctionComponent } from './components/e-auction/e-auction.component';
import { CheckoutComponent } from './components/check-out/check-out.component';
import { PaymentComponent } from './components/payment/payment.component';
import { HotelListingComponent } from './components/hotel-listing/hotel-listing.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';

import { ApiDataService } from './services/api-data.service';
import { SharedService } from './services/shared.service';

import { DatePicker } from './directives/datepicker/datepicker';

const appRoutes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'customer-signup', component: CustomerSignupComponent},
  {path: 'vendor-signup', component: VendorSignupComponent},
  {path: 'result', component: SearchResultComponent},
  {path: 'my-trips', component: MyTripsComponent},
  {path: 'itinerary-conversation', component: ItineraryConversation},
  {path: 'request-itinerary', component: ItineraryRequest},
  {path: 'my-hotels', component: MyHotels},
  {path: 'asset-register', component: AssetRegistrationComponent},
  {path: 'driver-register', component: DriverRegistrationComponent},
  {path: 'guide-register', component: GuideRegistrationComponent},
  {path: 'package-register', component: PackageRegistrationComponent},
  {path: 'show-quote-response', component: ShowQuoteResponseComponent},
  {path: 'trip-planner', component: TripPlannerComponent},
  {path: 'quote-request', component: QuoteRequestComponent},
  {path: 'create-itinerary', component: CreateItineraryComponent},
  {path: 'e-auction', component: EAuctionComponent},
  {path: 'check-out', component: CheckoutComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'hotel-listing', component: HotelListingComponent},
  {path: 'hotel-details/:id', component: HotelDetailsComponent},
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
    ItineraryConversation,
    ItineraryRequest,
    MyHotels,
    AssetRegistrationComponent,
    DriverRegistrationComponent,
    GuideRegistrationComponent,
    PackageRegistrationComponent,
    ShowQuoteResponseComponent,
    TripPlannerComponent,
    QuoteRequestComponent,
    CreateItineraryComponent,
    EAuctionComponent,
    CheckoutComponent,
    PaymentComponent,
    HotelListingComponent,
    HotelDetailsComponent,

    DatePicker
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
