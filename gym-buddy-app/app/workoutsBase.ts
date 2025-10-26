type Exercise = {
    id: number;
    titulo: string;
    media: string;
    info1: string;
    info2: string;
    orden: number;
};

type Routine = {
    id: number;
    nombre: string;
    userId: number;
    exercises: Exercise[];
};

///////// no hace falta todos los campos de los tipos acá

const trenSuperior = {
    nombre: "Tren Superior",
    exercises: [
        {
            titulo: "Flexiones de brazos",
            media: "https://i.blogs.es/886311/flexiones/450_1000.jpg",
            info1: "",
            info2: ""
        },
        {
            titulo: "Press de pecho con mancuerna",
            media: "https://static.strengthlevel.com/images/exercises/dumbbell-bench-press/dumbbell-bench-press-800.jpg",
            info1: "",
            info2: ""
        },
        {
            titulo: "Press militar con mancuerna",
            media: "https://eresfitness.com/wp-content/uploads/2019/05/Press-militar-sentado-con-mancuernas.webp",
            info1: "",
            info2: ""
        }
    ]
} //// hace falta completar el de arriba, hacer mas y añadirlos al arreglo que entrega la funcion abajo

export default () => [trenSuperior]