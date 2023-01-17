import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';


import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { PanelModule } from './panel/panel.module';
import { MomentModule } from 'ngx-moment';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { NgxHighlightJsModule } from '@nowzoo/ngx-highlight-js';

// Guard
import { UserGuard } from './services/user.guard';
import { UserService } from './services/user.service';
import { NoIdentityGuard } from './services/no.identity.guard';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserEditComponent,
    TopicsComponent,
    TopicDetailComponent,
    UsersComponent,
    ProfileComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    PanelModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    }),
    NgxHighlightJsModule.forRoot()
  ],
  providers: [
    appRoutingProviders,
    UserService,
    UserGuard,
    NoIdentityGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
