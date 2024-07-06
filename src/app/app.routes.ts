import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './pages/lists/lists.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { authGuard } from './_guards/auth.guard';
import { TestErrorComponent } from './Errors/test-error/test-error.component';
import { NotFoundComponent } from './Errors/not-found/not-found.component';
import { ServerErrorComponent } from './Errors/server-error/server-error.component';

export const routes: Routes = [

  { path: '', component: HomeComponent},

  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [

  { path: 'members', component: MemberListComponent},
  { path: 'members/:id', component: MemberDetailComponent},
  { path: 'lists', component: ListsComponent},
  { path: 'messages', component: MessagesComponent}
    ]
  },
  {path: 'errors', component: TestErrorComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},

  { path: '**', component: HomeComponent, pathMatch: 'full'},


];
