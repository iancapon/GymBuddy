
Algunos comentarios:

+ Estructura del backend:
Express_Server
	|_ prisma
		|_schema.prisma
		|_dev.db
	|_src
	     |_index.ts
	     |_register.ts
     
+ En app/API_URL.ts, colocar en donde dice API_URL, la ip de tu PC:
const API_URL = "http://192.168.1.13:4000/api";

+ Inicializo servidor (running in localhost: 4000):
	npm run dev

+ Opcion de visualizacion de base de datos: 
	Prisma studio:	npx prisma studio

+ la app está en /gym-buddy-app:
	Se suele instalar react 19.2.0 aunque no aparezca en package.json. 
	Esta version da problemas de compatibilidad. Instalen react@19.1.0

+ A veces aparece el error: "Internal React error: Expected static flag was missing. Please notify the React team."
	No encontramos la causa, pero parece correr sin mayores problemas.


