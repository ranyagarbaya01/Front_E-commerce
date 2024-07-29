import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent {
  

  client: User[] = [];
  search: string = '';
  

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers(); 
  }

  getUsers() {
    this.userService.getclients(this.search).subscribe({
      next: (response) => {
        this.client = response;
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
