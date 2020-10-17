import { Testimonial } from '../models/testimoniales.js';


const guardarTestimoniales = async ( req, res ) => {

    // Validar...
    const { nombre, email, mensaje } = req.body;

    let errores = [];

    if ( nombre.trim() === '' ) {
        errores = [...errores, {mensaje: 'El nombre está vacio'}];
    }
    if ( email.trim() === '' ) {
        errores = [...errores, {mensaje: 'El correo está vacio'}];
    }
    if ( mensaje.trim() === '' ) {
        errores = [...errores, {mensaje: 'El mensaje está vacio'}];
    }

    if ( errores.length > 0 ) {
        const testimoniales = await Testimonial.findAll();
        // Mostrar la vista con los erroes
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            email,
            mensaje,
            testimoniales
        });
    } else {
        // Almacenar en la base de datos
        try {
            await Testimonial.create({
                nombre,
                email,
                mensaje
            });

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }


}


export {
    guardarTestimoniales
}