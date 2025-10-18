
Algunos comentarios:

+ Estructura del backend:
Express_Server
	|_ prisma
		|_schema.prisma
		|_dev.db
	|_src
	     |_index.ts
	     |_register.ts
     
+ En app/modals/registro_screen.tsx, colocar en donde dice API_URL, la ip de tu PC:
const API_URL = "http://192.168.1.13:4000/api";

+ Inicializo servidor (running in localhost: 4000):
	npm run dev

+ Opcion de visualizacion de base de datos: 
	Prisma studio:	npx prisma studio


