import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatNativeDateModule, MatPaginatorModule,MatSortModule } from '@angular/material';
import  {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from  '@angular/common/http';
import { AppComponent } from './app.component';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { CurrencyInputComponent } from './components/currency-input/currency-input.component';
import { LiveWallComponent } from './components/live-wall/live-wall.component';
import { ForexService } from './services/forex.service';
import { CurrencyOutputComponent } from './components/currency-output/currency-output.component';
import 'hammerjs';

@NgModule({
  imports:      [ 
      BrowserModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      HttpClientModule,
      MatTableModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatSortModule,
      RouterModule.forRoot([
        { path: '', component: CurrencyInputComponent },
      ]), 
      FormsModule 
    ],
  declarations: [ 
      AppComponent, 
      TopHeaderComponent, 
      CurrencyInputComponent,
      LiveWallComponent,  
      CurrencyOutputComponent 
    ],
  bootstrap:    [ AppComponent ],
  providers: [ForexService]
})
export class AppModule { }
