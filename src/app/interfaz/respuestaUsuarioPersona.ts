export interface RespuestaUsuarioPersona {
    user: {
      _id: string;
      password: string;
      correo_electronico: string;
      fecha_registro: Date;
      fecha_ultimo_inicio_sesion: Date;
      imagen: string;
      nombre_usuario: string;
      persona: string;
      rol: string
    };
    persona: {
      nombre: string;
      apellido: string;
      fecha_nacimiento: Date;
      telefono: string;
    };
  }