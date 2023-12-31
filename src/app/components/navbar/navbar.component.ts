import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    username: string = 'Jonh Doe';
    location: Location;
      mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(location: Location,  private element: ElementRef, private router: Router) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit(){
      this.username = sessionStorage.getItem('username');
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            }else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { //asign a function
              body.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
 
      if(titlee.includes('#')) {
        if(titlee.includes('?')) {
            console.log('title');
           var paths:string[] = titlee.split('?');
           switch(paths[0]) {
            case '#/users':

                var params = paths[1].split('&');
                var classId: number =  +params[0].split('=')[1];
                var teacher: boolean = params[1].split('=')[1] === 'true';
               
                return `Clase ${classId} > ${teacher?'Profesores':'Estudiantes'}`;

            case '#/classes': 

                var params = paths[1].split('=');
                switch(params[0]) {
                    case 'userId':
                        return `Alumno ${params[1]} > Clases`;
                    case 'teacherId':
                        return `Profesor ${params[1]} > Clases`;
                    case 'levelId':
                         return `Nivel ${params[1]} > Clases`;    
                    default: 
                        return 'Articoding';                          
                }

            case '#/levels': 

                var params = paths[1].split('=');
                switch(params[0]) {
                    case 'classId':
                        return `Clase ${params[1]} > Niveles`;
                    case 'userId':
                        return `Usuario ${params[1]} > Niveles creados`;
                    default: 
                        return 'Articoding';                          
                }

            default: return 'Articoding';
           }
        } else if(titlee.split("/").length == 3) {
            var paths:string[] = titlee.split("/");
            switch(paths[1]) {
                case 'users':
                    return `Usuario ${paths[2]}`;
                case 'levels':
                    return `Nivel ${paths[2]}`;
                case 'classes':
                    return `Clase ${paths[2]}`;
                default: 
                    return 'Articoding';                          
            }
        }
      }
       if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }


      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }

    closeSession() {
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }
}
