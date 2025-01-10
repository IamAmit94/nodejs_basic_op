Just change your password with my name and if you have different DB name then change it from **prismaDB**


# Packages need in the project
npm i express dotenv nodemon prisma 
`npx prisma init`
`npx prisma` init: once this cmd is run it will be creating a prsima folder inside your project where you can configure your DB. And it will also create an .env file with the DATABASE_URL=""
`npm i @prisma/client`: Once the above config is done we will be installing the prisma client where the prisma config will be done

1. once the above config is done, Now it's time to create the model inside the `Prisma` folder under th `schema.prisma` file
2. After creating the model now we have to run the migration via cmd: `npx prisma migrate dev --name migrationName` This migration will be responsible for creating the table in the postgres.
    a. If the migration run successfully It will be creating a folder inside prisma --> migration(folder) --> migrationFolderName

3. In order to run all the installed migrations you need to run the mentioned cmd
 `npx prisma migrate deploy`: this cmd will run all the migrations present in the mirgrations folder