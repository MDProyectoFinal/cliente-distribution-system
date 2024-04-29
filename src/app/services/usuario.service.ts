import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';
import { firstValueFrom, identity } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { GLOBAL } from './global';
import { Usuario } from '../models/usuario';
import { HttpHeaders } from '@angular/common/http';
import { UsuarioPersona } from '../models/usuarioPersona';

// Decorador
@Injectable({
    providedIn: 'root'
  })
export class UsuarioServices{

    public url: string;
    public identity:any;
    public token:any;

    // constructor( private _httpClient: HttpClient ){
    constructor( private _http: HttpClient ){
        this.url = GLOBAL.url;
    }

    // *** LOGUEAR USUARIO ***
    async signUp(usuario_a_loguear: Usuario, gethash = false){
        
        try {
            if(gethash){
                usuario_a_loguear.gethash = gethash; 
            }

            let jsonUser = JSON.stringify(usuario_a_loguear);            
    
            // Como usamos Js en el servidor tambien, definimos asi el Content-Type
            let headers = new HttpHeaders({
                'Content-Type':'application/json',
                //'authorization': this.token,
                'Authorization': 'Bearer clave_secreta_trabajo_final'
            });
                           
            // Devolvemos la petición AJAX
            var resp = await firstValueFrom(this._http.post( this.url + 'loguear-usuario', jsonUser, { headers: headers })            
                .pipe(
                    map(response => {

                        return response;

                    }),
                    // Error arrojado desde el usuario.js. Clave incorrecta, usuario incorrecto, etc..
                    catchError(error => {                         
                        // Puedo definir si solo mando eso, o el status y mas info o solo el "error"
                        throw error.error.message;
                    }))
                );
                        
            return resp;
                            
        } catch (error) {            
            throw error
        }
    }

    // async registroUsuario(usuario_a_registrar: UsuarioPersona){
        
    //     var usuarioP = new Usuario('','','','','','ROLE_USER','', new Date, new Date, false); 

    //     let jsonUsuarioRegistro = JSON.stringify(usuarioP); 
    //     let params = jsonUsuarioRegistro;
     
    //     // Como usamos Js en el servidor tambien, definimos asi el Content-Type
    //     // let headers = new HttpHeaders({
    //     //     'Content-Type':'application/json',
    //     //     'autorizacion':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NDk2MGVkNWE4ZDA3OGY0NWY3YjAyNDAiLCJub21icmVfdXN1YXJpbyI6Ik1hbnVVc2VyIiwiZW1haWwiOiJtYW51cGVyZXpAZ21haWwuY29tIiwicm9sIjoiQ2xpZW50ZSIsImltYWdlbiI6Im51bGwiLCJpYXQiOjE2OTE1MzE2MDEsImV4cCI6MTY5NDEyMzYwMX0.i0fL37ACEC2I_oWrwPDGfXrHGK2eDCfnarXK17hAgmA',
    //     //     'Authorization': 'Bearer clave_secreta_trabajo_final'
    //     // });

    //     const headers = new HttpHeaders({
    //         'Content-Type': 'application/json' // 'application/x-www-form-urlencoded'
    //     });

    //     try {
    //         // Devolvemos la petición AJAX
    //         const resp = await this._http.post( this.url + 'guardar-persona', params, {headers: headers} )
    //         .pipe(                
    //             map(response => {    //                 
    //                 console.log( {resp: response, message: "Respuesta dentro del pipe.map..."} );
    //                 //return response;
    //             }),
    //             // Error arrojado desde el usuario.js. Clave incorrecta, usuario incorrecto, etc..
    //             catchError(error => {     //                 
    //                 console.log({error:error.error.message, message: "No se encontró el usuario logueado"});
                    
    //                 // Puedo definir si solo mando eso, o el status y mas info o solo el "error"
    //                 throw error.error.message;
    //             }));     
            
    //         // var resp = await this._http.get( this.url + 'probando-controlador', { headers: headers })  
    //         //     .pipe(
    //         //         map(response => {    //         //             
    //         //             console.log( {resp: response, message: "Respuesta dentro del pipe.map..."} );
    //         //             return response;
    //         //         }),
    //         //         // Error arrojado desde el usuario.js. Clave incorrecta, usuario incorrecto, etc..
    //         //         catchError(error => {     //         //             
    //         //             console.log({error:error.error.message, message: "No se encontró el usuario logueado"});
                        
    //         //             // Puedo definir si solo mando eso, o el status y mas info o solo el "error"
    //         //             throw error.error.message;
    //         //         }));  

    //         console.log({ message: "No tira error?", respuesta: resp });
    //         return resp;

    //     } catch (error) {
    //         console.log({error:error, message: "CATCH -No se encontró el usuario logueado"});
            
    //         // Puedo definir si solo mando eso, o el status y mas info o solo el "error"
    //         throw error;
    //     }
        

    // }


    async actualizarUsuario( usuario_a_actualizar:any ){        
        let jsonUser = JSON.stringify(usuario_a_actualizar);            
    
        // Como usamos Js en el servidor tambien, definimos asi el Content-Type
        let headers = new HttpHeaders({
            'Content-Type':'application/json',
            //'autorizacion': this.getToken(),
            'authorization': this.token,
            // 'Authorization': 'Bearer clave_secreta_trabajo_final'
        });

        try {
            // Devolvemos la petición AJAX
            var resp = await firstValueFrom(this._http.put( this.url + 'actualizar-usuario/' + usuario_a_actualizar._id, jsonUser, { headers: headers }));

            if(resp){
                console.log(resp);

                // Deberiamos formar un objeto con el UsuarioPersona para luego cambiar la variable
                return resp;

            }else{
                console.log('Ocurrio un error al actualizar el usuario');
                return null;
            }

        } catch (error: any) {            
            throw error.error.message;
        }
        

    }


    getIdentity(){    
        let identity = localStorage.getItem('identity');
        // const identityString = identity ? JSON.stringify(identity) : '';

        // if(identityString != 'undefined' && identityString != ''){
        //     this.identity = identityString;
        // }else{
        //     this.identity = null;
        // }

        return localStorage.getItem('identity');
        //return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');
        const tokenString = token ? JSON.stringify(token) : '';

        if(tokenString != 'undefined' && tokenString != ''){
            this.token = tokenString;
        }else{
            this.token = null;
        } 

        return this.token;
    }
    
} 

