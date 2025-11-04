/*
const oldExerciseFormat = {
    titulo: 'Flexiones de brazos',
    media: '---',
    info1: '3 series de 10-15 repeticiones',
    info2: '30-60 segundos de descanso',
};

const newExerciseFormat = {
    titulo: 'Flexiones de brazos',
    media: '---',
    series: 3,
    repesXserie: 10,
    tiempoXserie: 10,
    descansoXserie: 30
}*/
///////

const trenSuperior = {
    nombre: "Tren Superior",
    exercises: [
        {
            titulo: "Flexiones de brazos",
            media: "https://media.vogue.es/photos/621771ace529511d4af263e5/master/w_1600%2Cc_limit/tabla-de-ejercicios4-1.jpeg",
            series: 3,
            repesXserie: 10,
            tiempoXserie: null,
            descansoXserie: 30
        },
        {
            titulo: "Press de hombros con mancuernas",
            media: "https://eresfitness.com/wp-content/uploads/2019/05/Press-militar-para-hombros-musculos-involucrados.jpg.webp",
            series: 3,
            repesXserie: 8,
            tiempoXserie: null,
            descansoXserie: 60
        },
        {
            titulo: "Remo con barra",
            media: "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Barbell-Row_4beb1d94-bac9-4538-9578-2d9cf93ef008_600x600.png?v=1612138201",
            series: 4,
            repesXserie: 10,
            tiempoXserie: null,
            descansoXserie: 60
        },
        {
            titulo: "Curl de bíceps con mancuernas",
            media: "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Alternating-Dumbbell-Curl_ad879dc4-b4fb-4ca7-b2b1-6e1eb5d78252_600x600.png?v=1612137169",
            series: 3,
            repesXserie: 12,
            tiempoXserie: null,
            descansoXserie: 30
        },
        {
            titulo: "Fondos de tríceps en paralelas",
            media: "https://i.blogs.es/e7c213/dips/450_1000.webp",
            series: 3,
            repesXserie: 10,
            tiempoXserie: null,
            descansoXserie: 60
        },
        {
            titulo: "Elevaciones laterales de hombros",
            media: "https://static.strengthlevel.com/images/exercises/dumbbell-lateral-raise/dumbbell-lateral-raise-800.jpg",
            series: 3,
            repesXserie: 15,
            tiempoXserie: null,
            descansoXserie: 30
        },
        {
            titulo: "Press de banca",
            media: "https://static.strengthlevel.com/images/exercises/bench-press/bench-press-800.jpg",
            series: 4,
            repesXserie: 8,
            tiempoXserie: null,
            descansoXserie: 90
        },
        {
            titulo: "Remo con mancuernas a una mano",
            media: "https://www.cambiatufisico.com/wp-content/uploads/remo-mancuerna-1.jpg",
            series: 3,
            repesXserie: 10,
            tiempoXserie: null,
            descansoXserie: 60
        },
        {
            titulo: "Flexiones diamante",
            media: "https://static.strengthlevel.com/images/exercises/diamond-push-ups/diamond-push-ups-800.jpg",
            series: 3,
            repesXserie: 10,
            tiempoXserie: null,
            descansoXserie: 45
        },
        {
            titulo: "Plancha con apoyo de antebrazos",
            media: "https://pbs.twimg.com/media/ERPCNPkWoAEEh3n.png",
            series: 3,
            repesXserie: null,
            tiempoXserie: 30,
            descansoXserie: 30
        }
    ]
}

const trenInferior = {
    nombre: "Tren Inferior",
    exercises: [
        {
            titulo: "Sentadillas",
            media: "https://s3assets.skimble.com/assets/2845/skimble-workout-trainer-exercise-squat-2_iphone.jpg",
            series: 4,
            repesXserie: 12,
            tiempoXserie: null,
            descansoXserie: 60
        },
        {
            titulo: "Zancadas alternas",
            media: "https://www.justpodium.com/Galeria/zancada-alterna_20180228110941.jpg",
            series: 3,
            repesXserie: 12,
            tiempoXserie: null,
            descansoXserie: 60
        },
        {
            titulo: "Puente de glúteos",
            media: "https://images.squarespace-cdn.com/content/v1/5ebef943272c1041d83b1d15/1707626699721-K29HYDPVK31MYBF4UZZN/Puente+de+Glu%CC%81teo.jpeg",
            series: 3,
            repesXserie: 15,
            tiempoXserie: null,
            descansoXserie: 45
        },
        {
            titulo: "Peso muerto con piernas rígidas",
            media: "https://eresfitness.com/wp-content/uploads/Peso-muerto-con-barra-piernas-rigidas.webp",
            series: 4,
            repesXserie: 10,
            tiempoXserie: null,
            descansoXserie: 90
        },
        {
            titulo: "Elevaciones de talones (gemelos)",
            media: "https://eresfitness.com/wp-content/uploads/Levantamiento-de-pantorrillas-de-pie-con-mancuernas-sobre-banco-Flat.webp",
            series: 4,
            repesXserie: 20,
            tiempoXserie: null,
            descansoXserie: 30
        },
        {
            titulo: "Step-ups en banco",
            media: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlJyzEdlGWv-MUlZGq3fgKUWFBP75JR4I3PA&s",
            series: 3,
            repesXserie: 12,
            tiempoXserie: null,
            descansoXserie: 60
        },
        {
            titulo: "Sentadilla sumo",
            media: "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Kettlebell-Sumo-Deadlift_600x600.png?v=1655224172",
            series: 3,
            repesXserie: 12,
            tiempoXserie: null,
            descansoXserie: 60
        },
        {
            titulo: "Peso muerto a una pierna",
            media: "https://giansalud.com/wp-content/uploads/2023/12/18.2-kettlebell-one-legged-deadlift-peso-muerto-a-una-pierna-con-kettlebell-isquiotibiales-isquisurales-powerlifting-gian-salud-gianfranco-slepetis-ezequiel-costa-uguet.webp",
            series: 3,
            repesXserie: 10,
            tiempoXserie: null,
            descansoXserie: 60
        },
        {
            titulo: "Sentadilla búlgara",
            media: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC7OAVuJx1y4NQ4XMRbVapfpTXSzkw_Dd9WQ&s",
            series: 3,
            repesXserie: 10,
            tiempoXserie: null,
            descansoXserie: 60
        },
        {
            titulo: "Patada de glúteo en cuadrupedia",
            media: "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Donkey-Kicks_600x600.png?v=1656782198",
            series: 3,
            repesXserie: 15,
            tiempoXserie: null,
            descansoXserie: 30
        }
    ]
}


const core = {
    nombre: "Core",
    exercises: [
        {
            titulo: "Plancha frontal",
            media: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgYfyDcZ5JmFQMgjmfbnhY_AuZIdJDNrosjw&s",
            series: 3,
            repesXserie: null,
            tiempoXserie: 30,
            descansoXserie: 30
        },
        {
            titulo: "Plancha lateral",
            media: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZQi0Nx42uHU6Ex4ix3ZclI_5gXhWPvYZDSi580Dm7g_KwRaopz8Aeq-6Mlbm5pXFlNaA-uEbh2jWDSYMl6vRcxmmJpbVNNXXeKo4J_Yjbup4Xys0Y1-_FTsZ9rNNfcoHJqteVaNHRLr8/w1200-h630-p-k-no-nu/plancha-lateral.jpg",
            series: 3,
            repesXserie: null,
            tiempoXserie: 30,
            descansoXserie: 30
        },
        {
            titulo: "Crunch abdominal",
            media: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8d7L6ogtaQqtceOz_TAupUDO9CXUeaf_fow&s",
            series: 3,
            repesXserie: 15,
            tiempoXserie: null,
            descansoXserie: 30
        },
        {
            titulo: "Elevación de piernas",
            media: "https://static.strengthlevel.com/images/exercises/lying-leg-raise/lying-leg-raise-800.jpg",
            series: 3,
            repesXserie: 12,
            tiempoXserie: null,
            descansoXserie: 45
        },
        {
            titulo: "Bicicleta en el aire",
            media: "Bicicleta en el aire",
            series: 3,
            repesXserie: 20,
            tiempoXserie: null,
            descansoXserie: 30
        },
        {
            titulo: "Plancha con toque de hombro",
            media: "https://content21.sabervivirtv.com/medio/2025/08/22/plancha-con-toque-de-hombro_a574aeb7_1355886291_250822125529_990x660.webp",
            series: 3,
            repesXserie: 12,
            tiempoXserie: null,
            descansoXserie: 30
        },
        {
            titulo: "Mountain climbers",
            media: "https://images.ctfassets.net/hjcv6wdwxsdz/1WCM5ZFQUTUvuDohwMqr3B/f9b0d7e0eefafd21806937e72b2f867e/mountain-climbers.png",
            series: 3,
            repesXserie: null,
            tiempoXserie: 30,
            descansoXserie: 30
        },
        {
            titulo: "Russian twist",
            media: "https://media1.popsugar-assets.com/files/thumbor/Vv1TM93xqKvgM9IOWI8BoML88D8=/fit-in/2160x1484/top/filters:format_auto():extract_cover():upscale()/2024/01/02/752/n/1922729/3300e166ea0ccfe2_PS23_Fitness_Workout_14_Move_10_Russian_Twist_Alt.jpg",
            series: 3,
            repesXserie: 20,
            tiempoXserie: null,
            descansoXserie: 30
        },
        {
            titulo: "Hollow body hold",
            media: "https://liftmanual.com/wp-content/uploads/2023/04/hollow-hold.jpg",
            series: 3,
            repesXserie: null,
            tiempoXserie: 20,
            descansoXserie: 30
        },
        {
            titulo: "V-ups",
            media: "https://weighttraining.guide/wp-content/uploads/2016/11/v-up-resized.png",
            series: 3,
            repesXserie: 12,
            tiempoXserie: null,
            descansoXserie: 45
        }
    ]
}



export default () => [trenSuperior, trenInferior, core]