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
            media: "https://media.vogue.es/photos/621771ace529511d4af263e5/master/w_1600%2Cc_limit/tabla-de-ejercicios4-1.jpeg",
            info1: "3 series de 10-15 repeticiones",
            info2: "30-60 segundos de descanso"
        },
        {
            titulo: "Press de hombros con mancuernas",
            media: "https://eresfitness.com/wp-content/uploads/2019/05/Press-militar-para-hombros-musculos-involucrados.jpg.webp",
            info1: "3 series de 8-12 repeticiones",
            info2: "60 segundos de descanso"
        },
        {
            titulo: "Remo con barra",
            media: "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Barbell-Row_4beb1d94-bac9-4538-9578-2d9cf93ef008_600x600.png?v=1612138201",
            info1: "4 series de 10 repeticiones",
            info2: "60-90 segundos de descanso"
        },
        {
            titulo: "Curl de bíceps con mancuernas",
            media: "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Alternating-Dumbbell-Curl_ad879dc4-b4fb-4ca7-b2b1-6e1eb5d78252_600x600.png?v=1612137169",
            info1: "3 series de 12 repeticiones",
            info2: "30-45 segundos de descanso"
        },
        {
            titulo: "Fondos de tríceps en paralelas",
            media: "https://i.blogs.es/e7c213/dips/450_1000.webp",
            info1: "3 series de 10-12 repeticiones",
            info2: "60 segundos de descanso"
        },
        {
            titulo: "Elevaciones laterales de hombros",
            media: "https://static.strengthlevel.com/images/exercises/dumbbell-lateral-raise/dumbbell-lateral-raise-800.jpg",
            info1: "3 series de 15 repeticiones",
            info2: "30 segundos de descanso"
        },
        {
            titulo: "Press de banca",
            media: "https://static.strengthlevel.com/images/exercises/bench-press/bench-press-800.jpg",
            info1: "4 series de 8 repeticiones",
            info2: "90 segundos de descanso"
        },
        {
            titulo: "Remo con mancuernas a una mano",
            media: "https://www.cambiatufisico.com/wp-content/uploads/remo-mancuerna-1.jpg",
            info1: "3 series de 10-12 repeticiones por lado",
            info2: "60 segundos de descanso"
        },
        {
            titulo: "Flexiones diamante",
            media: "https://static.strengthlevel.com/images/exercises/diamond-push-ups/diamond-push-ups-800.jpg",
            info1: "3 series de 10-15 repeticiones",
            info2: "45 segundos de descanso"
        },
        {
            titulo: "Plancha con apoyo de antebrazos",
            media: "https://pbs.twimg.com/media/ERPCNPkWoAEEh3n.png",
            info1: "3 repeticiones de 30-60 segundos",
            info2: "30 segundos de descanso"
        }
    ]
}

const trenInferior = {
    nombre: "Tren Inferior",
    exercises: [
        {
            titulo: "Sentadillas",
            media: "https://s3assets.skimble.com/assets/2845/skimble-workout-trainer-exercise-squat-2_iphone.jpg",
            info1: "4 series de 12-15 repeticiones",
            info2: "60-90 segundos de descanso"
        },
        {
            titulo: "Zancadas alternas",
            media: "https://www.justpodium.com/Galeria/zancada-alterna_20180228110941.jpg",
            info1: "3 series de 12 repeticiones por pierna",
            info2: "60 segundos de descanso"
        },
        {
            titulo: "Puente de glúteos",
            media: "https://images.squarespace-cdn.com/content/v1/5ebef943272c1041d83b1d15/1707626699721-K29HYDPVK31MYBF4UZZN/Puente+de+Glu%CC%81teo.jpeg",
            info1: "3 series de 15 repeticiones",
            info2: "45-60 segundos de descanso"
        },
        {
            titulo: "Peso muerto con piernas rígidas",
            media: "https://eresfitness.com/wp-content/uploads/Peso-muerto-con-barra-piernas-rigidas.webp",
            info1: "4 series de 10-12 repeticiones",
            info2: "90 segundos de descanso"
        },
        {
            titulo: "Elevaciones de talones (gemelos)",
            media: "https://eresfitness.com/wp-content/uploads/Levantamiento-de-pantorrillas-de-pie-con-mancuernas-sobre-banco-Flat.webp",
            info1: "4 series de 20 repeticiones",
            info2: "30-45 segundos de descanso"
        },
        {
            titulo: "Step-ups en banco",
            media: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlJyzEdlGWv-MUlZGq3fgKUWFBP75JR4I3PA&s",
            info1: "3 series de 12 repeticiones por pierna",
            info2: "60 segundos de descanso"
        },
        {
            titulo: "Sentadilla sumo",
            media: "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Kettlebell-Sumo-Deadlift_600x600.png?v=1655224172",
            info1: "3 series de 12-15 repeticiones",
            info2: "60 segundos de descanso"
        },
        {
            titulo: "Peso muerto a una pierna",
            media: "https://giansalud.com/wp-content/uploads/2023/12/18.2-kettlebell-one-legged-deadlift-peso-muerto-a-una-pierna-con-kettlebell-isquiotibiales-isquisurales-powerlifting-gian-salud-gianfranco-slepetis-ezequiel-costa-uguet.webp",
            info1: "3 series de 10 repeticiones por pierna",
            info2: "60 segundos de descanso"
        },
        {
            titulo: "Sentadilla búlgara",
            media: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC7OAVuJx1y4NQ4XMRbVapfpTXSzkw_Dd9WQ&s",
            info1: "3 series de 10-12 repeticiones por pierna",
            info2: "60-90 segundos de descanso"
        },
        {
            titulo: "Patada de glúteo en cuadrupedia",
            media: "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Donkey-Kicks_600x600.png?v=1656782198",
            info1: "3 series de 15 repeticiones por pierna",
            info2: "30-45 segundos de descanso"
        }
    ]
}

const core = {
    nombre: "Core",
    exercises: [
        {
            titulo: "Plancha frontal",
            media: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgYfyDcZ5JmFQMgjmfbnhY_AuZIdJDNrosjw&s",
            info1: "3 repeticiones de 30-60 segundos",
            info2: "30-45 segundos de descanso"
        },
        {
            titulo: "Plancha lateral",
            media: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZQi0Nx42uHU6Ex4ix3ZclI_5gXhWPvYZDSi580Dm7g_KwRaopz8Aeq-6Mlbm5pXFlNaA-uEbh2jWDSYMl6vRcxmmJpbVNNXXeKo4J_Yjbup4Xys0Y1-_FTsZ9rNNfcoHJqteVaNHRLr8/w1200-h630-p-k-no-nu/plancha-lateral.jpg",
            info1: "3 repeticiones de 30-45 segundos por lado",
            info2: "30 segundos de descanso"
        },
        {
            titulo: "Crunch abdominal",
            media: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8d7L6ogtaQqtceOz_TAupUDO9CXUeaf_fow&s",
            info1: "3 series de 15-20 repeticiones",
            info2: "30 segundos de descanso"
        },
        {
            titulo: "Elevación de piernas",
            media: "https://static.strengthlevel.com/images/exercises/lying-leg-raise/lying-leg-raise-800.jpg",
            info1: "3 series de 12-15 repeticiones",
            info2: "45 segundos de descanso"
        },
        {
            titulo: "Bicicleta en el aire",
            media: "Bicicleta en el aire",
            info1: "3 series de 20 repeticiones por lado",
            info2: "30-45 segundos de descanso"
        },
        {
            titulo: "Plancha con toque de hombro",
            media: "https://content21.sabervivirtv.com/medio/2025/08/22/plancha-con-toque-de-hombro_a574aeb7_1355886291_250822125529_990x660.webp",
            info1: "3 series de 12-15 repeticiones por lado",
            info2: "30-45 segundos de descanso"
        },
        {
            titulo: "Mountain climbers",
            media: "https://images.ctfassets.net/hjcv6wdwxsdz/1WCM5ZFQUTUvuDohwMqr3B/f9b0d7e0eefafd21806937e72b2f867e/mountain-climbers.png",
            info1: "3 series de 30-40 segundos",
            info2: "30-60 segundos de descanso"
        },
        {
            titulo: "Russian twist",
            media: "https://media1.popsugar-assets.com/files/thumbor/Vv1TM93xqKvgM9IOWI8BoML88D8=/fit-in/2160x1484/top/filters:format_auto():extract_cover():upscale()/2024/01/02/752/n/1922729/3300e166ea0ccfe2_PS23_Fitness_Workout_14_Move_10_Russian_Twist_Alt.jpg",
            info1: "3 series de 20 repeticiones (10 por lado)",
            info2: "30-45 segundos de descanso"
        },
        {
            titulo: "Hollow body hold",
            media: "https://liftmanual.com/wp-content/uploads/2023/04/hollow-hold.jpg",
            info1: "3 repeticiones de 20-40 segundos",
            info2: "30-45 segundos de descanso"
        },
        {
            titulo: "V-ups",
            media: "https://weighttraining.guide/wp-content/uploads/2016/11/v-up-resized.png",
            info1: "3 series de 12-15 repeticiones",
            info2: "45 segundos de descanso"
        }
    ]
}


export default () => [trenSuperior, trenInferior, core]