import { Component } from '@angular/core';
import { User } from '../../shared/models/user';
import { ShopService } from '../../shop/shop.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {

  users: User[] = [];
  search: string = '';
  

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers(); 
  }

  getUsers() {
    this.userService.getutilisateurs(this.search).subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => console.log(error)
    });
  }

  onSearchChange(searchValue: string): void {
    this.search = searchValue;
    this.getUsers();
  }

  deleteUser(id: number) {
    this.userService.deleteuser(id).subscribe({
      next: () => {
        this.getUsers(); 
      },
      error: (error) => console.log(error)
    });
  }

}
