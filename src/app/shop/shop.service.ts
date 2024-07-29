import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/product';
import { Type } from '../shared/models/product';
import { ShopParams } from '../shared/models/product';
import { Observable, map, of, tap } from 'rxjs';
import { isBs4 } from 'ngx-bootstrap/utils/theme-provider';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7179/api/';
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  users: User[] = [];
  pagination?: Pagination<Product[]>;
  shopParams = new ShopParams();
  productCache = new Map<string, Pagination<Product[]>>();

  constructor(private http: HttpClient) { }

  getProducts(useCache = true): Observable<Pagination<Product[]>> {
    if (!useCache) this.productCache = new Map();
  
    if (this.productCache.size > 0 && useCache) {
      if (this.productCache.has(Object.values(this.shopParams).join('-'))) {
        this.pagination = this.productCache.get(Object.values(this.shopParams).join('-'));
        if(this.pagination) return of(this.pagination);
      }
    }
  
    let params = new HttpParams();
  
    if (this.shopParams.brandId > 0) params = params.append('brandId', this.shopParams.brandId.toString());
    if (this.shopParams.typeId) params = params.append('typeId', this.shopParams.typeId.toString());
    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());
  
    if (this.shopParams.search) params = params.append('search', this.shopParams.search);
  
    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'produit', { params }).pipe(
      map(response => {
        this.productCache.set(Object.values(this.shopParams).join('-'), response);
        this.pagination = response;
        return response;
      })
    );
  }
  getallproduct(serch : string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}Produit/all/?serch=${serch}`);
  }
  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getProduct(id: number): Observable<Product> {
    const product = [...this.productCache.values()]
      .reduce((acc, paginatedResult) => {
        return {...acc, ...paginatedResult.data.find(x => x.id === id)}
      }, {} as Product)

    if (Object.keys(product).length !== 0) return of(product);

    return this.http.get<Product>(this.baseUrl + 'Produit/' + id);
  }
  
 
  addProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}Produit`, formData);
  }

  updateProduct(id: number, formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}Produit/${id}`, formData);
  }
  deleteproduct(id : number){
    return this.http.delete(`${this.baseUrl}Produit/${id}`)
  }


  //CRUD Type
  getTypes(search: string = ''): Observable<Type[]> {
    if (this.types.length > 0 && !search) {
      return of(this.types);
    }

    return this.http.get<Type[]>(`${this.baseUrl}TypeFamille/types/?search=${search}`).pipe(
      tap((types) => {
        if (!search) {
          this.types = types;
        }
      })
    );
  }
  

  getTypeById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}TypeFamille/types/${id}`);
  }

  addType(type: Type): Observable<Type> {
    return this.http.post<Type>(`${this.baseUrl}TypeFamille/types`, type);
  }

  updateType(id: number, typeData: Type): Observable<Type> {
    return this.http.put<Type>(`${this.baseUrl}TypeFamille/types/${id}`, typeData);
  }

  deleteType(id: number) {
    return this.http.delete(`${this.baseUrl}TypeFamille/types/${id}`);
  }

  //CRUD Brand

  getBrands(search: string = ''): Observable<Brand[]> {
    if (this.brands.length > 0 && !search) {
      return of(this.brands);
    }

    return this.http.get<Brand[]>(`${this.baseUrl}TypeFamille/Famille/?search=${search}`).pipe(
      tap((brands) => {
        if (!search) {
          this.brands = brands;
        }
      })
    );
  }

  getFamilleById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}TypeFamille/Famille/${id}`);
  }

  addBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(`${this.baseUrl}TypeFamille/Famille`, brand);
  }


  updateBrand(id: number, brand: Brand): Observable<Brand> {
    return this.http.put<Brand>(`${this.baseUrl}TypeFamille/Famille/${id}`, brand);
  }

  deleteBrand(id: number) {
    return this.http.delete(`${this.baseUrl}TypeFamille/Famille/${id}`);
  }


  //CRUD user

  getUser(search: string = ''): Observable<User[]> {
    if (this.users.length > 0 && !search) {
      return of(this.users);
    }

    return this.http.get<User[]>(`${this.baseUrl}Users?search=${search}`).pipe(
      tap((users) => this.users = users)
    );
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}Users/${id}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Users`, user);
  }

  updateUser(id: number, userData: User): Observable<User> {
    return this.http.put<any>(`${this.baseUrl}Users/${id}`, userData);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}Users/${id}`);
  }


}
