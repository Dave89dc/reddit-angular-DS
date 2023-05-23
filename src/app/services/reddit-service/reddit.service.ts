import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Post } from 'src/app/models/base-model';

@Injectable({
  providedIn: 'root'
})

export class RedditService {

  constructor(private http:HttpClient){}

  getRedditPosts(argument:string): Observable<Post[]>{
    return this.http.get<any>('https://www.reddit.com/r/'+ argument +'/hot.json?limit=100').pipe(
      tap((obj) => console.log('Sono dentro il primo tap:', obj)), // il tap è solo per il console.log
      map((obj) => obj.data), //il map elabora l'evento
      tap((data) => console.log('Sono dentro il secondo tap:', data)),
      map((data) => data.children),
      tap((children) => console.log('Sono dentro il terzo tap:', children)),
      map((children) => children.map((child: any) => child.data)), // il secondo map è il map classico dell'array
      tap((childrenData) => console.log('Sono dentro il quarto tap:', childrenData))

      // oppure:

      // map((obj) => {
      //   const data = obj.data;
      //   const children = data.children;
      //   const childrenData = children.map((child: any) => child.data);
      //   return childrenData;
      // })

    );
  }
}
