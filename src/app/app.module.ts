import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { DemoMaterialModule} from './material.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule, DemoMaterialModule,
   HttpClientModule, HttpModule ],
  declarations: [ AppComponent, HelloComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
