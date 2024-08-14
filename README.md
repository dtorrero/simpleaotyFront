# simpleAOTYFront
Simple front for AOTY web in JS REACT 

**compose.yaml**



```
services:
  frontend:
    image: ghcr.io/dtorrero/simpleaotyfront/simpleaoty-frontend:latest
    ports:
      - "3000:3000"  
    depends_on:
      - backend
    environment:
      - REACT_APP_BACKEND=backend  

  backend:
    image: ghcr.io/dtorrero/simpleaoty/simpleaoty-backend:latest
    ports:
      - "3001:3001"  
    environment:
      - DB_PATH=./aoty.db
      - PORT=3001
      - SECRET=your_secret
      - FRURL=http://yourfrontend:3000 
``` 
