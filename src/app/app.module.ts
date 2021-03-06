import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';
import { HelloComponent } from './hello.component';
import { KtdPlaygroundModule } from './playground/playground.module';
import { KtdCustomHandlesModule } from './custom-handles/custom-handles.module';

@NgModule({
  imports: [KtdPlaygroundModule, KtdCustomHandlesModule,  BrowserModule, FormsModule, ROUTING],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
