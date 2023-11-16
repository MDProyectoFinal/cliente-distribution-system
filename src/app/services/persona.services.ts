import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';
import { firstValueFrom, identity } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { GLOBAL } from './global';
import { Persona } from '../models/persona';
import { HttpHeaders } from '@angular/common/http';
import { UsuarioPersona } from '../models/usuarioPersona';

// Decorador
@Injectable({
    providedIn: 'root'
  })
export class PersonaServices{

    public url: string;
    public identity:any;
    public token:any;

    // constructor( private _httpClient: HttpClient ){
    constructor( private _http: HttpClient ){
        this.url = GLOBAL.url;
    }

    async guardarPersona(usuario_a_registrar: UsuarioPersona): Promise<any>{
        
        let jsonUsuarioRegistro = JSON.stringify(usuario_a_registrar); 
        
        const headers = new HttpHeaders({
            'Content-Type':'application/json; charset=utf-8'
            //'Content-Type': 'application/x-www-form-urlencoded'
            //'autorizacion':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NDk2MGVkNWE4ZDA3OGY0NWY3YjAyNDAiLCJub21icmVfdXN1YXJpbyI6Ik1hbnVVc2VyIiwiZW1haWwiOiJtYW51cGVyZXpAZ21haWwuY29tIiwicm9sIjoiQ2xpZW50ZSIsImltYWdlbiI6Im51bGwiLCJpYXQiOjE2OTE1MzE2MDEsImV4cCI6MTY5NDEyMzYwMX0.i0fL37ACEC2I_oWrwPDGfXrHGK2eDCfnarXK17hAgmA',
            //'Authorization': 'Bearer clave_secreta_trabajo_final'           
        });

        try {
            // Devolvemos la petición AJAX            
            const resp = await firstValueFrom(await this._http.post( this.url + 'guardar-persona', jsonUsuarioRegistro, {headers: headers} ));     
            
            if(resp){
                return resp;
            }else{
                return new Error("Error al guardar la persona");
            }            

        } catch (error:any) {            
            // Puedo definir si solo mando eso, o el status y mas info o solo el "error"
            throw error.error.mensaje;            
        }         
    } 
    
    async obtenerPersona(_idPersona: any, _token:any): Promise<any>{
                        
        this.token = _token;
        
        console.log(_idPersona);
        console.log(this.token);
        
        const headers = new HttpHeaders({
            //'Content-Type':'application/json; charset=utf-8',
            //'Content-Type': 'application/x-www-form-urlencoded'
            //'autorizacion':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NDk2MGVkNWE4ZDA3OGY0NWY3YjAyNDAiLCJub21icmVfdXN1YXJpbyI6Ik1hbnVVc2VyIiwiZW1haWwiOiJtYW51cGVyZXpAZ21haWwuY29tIiwicm9sIjoiQ2xpZW50ZSIsImltYWdlbiI6Im51bGwiLCJpYXQiOjE2OTE1MzE2MDEsImV4cCI6MTY5NDEyMzYwMX0.i0fL37ACEC2I_oWrwPDGfXrHGK2eDCfnarXK17hAgmA',
            'authorization': this.token,
            //'authorization': 'Bearer clave_secreta_trabajo_final',
        });

        const opciones = { headers: headers }

        try {
            
            // Devolvemos la petición AJAX            
            const resp = await firstValueFrom(this._http.get(this.url + 'obtener-persona/' + _idPersona, opciones));     
            
            if(resp){
                return resp;
            }else{
                return new Error("Error al obtener la persona");
            }            

        } catch (error:any) {            
            // Puedo definir si solo mando eso, o el status y mas info o solo el "error"
            throw error.error.mensaje;            
        }      

    }

} 