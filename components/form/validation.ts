import * as Yup from 'yup';

export const TableroSchema = Yup.object().shape({
    nombre: Yup.string().trim().required('El nombre es obligatorio'),
    ubicacion: Yup.string().trim().required('La ubicación es obligatoria'),
    marca: Yup.string().trim().optional(),

    capacidad_amperios: Yup.number()
        .typeError('La capacidad debe ser un número')
        .required('La capacidad es obligatoria')
        .min(1, 'Debe ser mayor a 0'),

    estado: Yup.string().required('El estado es obligatorio'),

    ano_fabricacion: Yup.number()
        .typeError('Debe ser un número válido')
        .required('El año de fabricación es obligatorio'),

    ano_instalacion: Yup.number()
        .typeError('Debe ser un número válido')
        .required('El año de instalación es obligatorio')
        .test('ano-comparacion', 'El año de instalación no puede ser menor al de fabricación', function(value) {
            const { ano_fabricacion } = this.parent;
            if (!value || !ano_fabricacion) return true;
            return value >= ano_fabricacion;
        }),
});
