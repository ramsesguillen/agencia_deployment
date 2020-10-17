import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/testimoniales.js';


const paginaInicio = async (req, res) => {

    // Consulta 3 viajes del modelo viaje 
    try {

        const resultado = await Promise.all([
            Viaje.findAll({ limit: 3 }),
            Testimonial.findAll({ limit: 3})
        ]);

        res.render('Inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }
}
const paginaNosotros = (req, res) => {

    res.render('nosotros', {
        pagina: 'Nosotros'
    });

}
const paginaViajes = async (req, res) => {

    const viajes = await Viaje.findAll();
    // console.log(viajes);

    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes
    });

}
const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }

}

// Muestra un viake por su slug
const paginaDetalleViaje = async ( req, res ) => {
    const { slug } = req.params;


    try {
        const viaje = await Viaje.findOne({ where: { slug } });

        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }
}


export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}