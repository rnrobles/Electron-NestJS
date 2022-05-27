import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { app as electronApp, BrowserWindow } from 'electron';
import { AllExceptionsFilter } from './filter/all-exceptions.filter';
import { QueryFailedExceptionFilter } from './filter/query-orm-error.filter';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Gestion de usuarios de ejemplo')
    .setDescription('Prueba tecnica de un API hecho en NestJS')
    .setVersion('1.0')
    .setContact(
      'rnrobles',
      'https://www.rnrobles.online/',
      'rnrobles.dev@gmail.com',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: `Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
      },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if (electronApp) {
    electronApp.whenReady().then(async () => {
      console.log('test');
      createWindow();
    });
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new QueryFailedExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Angular and Electron',
    resizable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      //      preload: path.join(__dirname, '/dist/main.js'), // use a preload script
    },
  });

  // appWin.loadFile('./front/index.html');
  //await win.loadFile('./dist/examenAngular/index.html');
  await win.loadURL('http:localhost:3000/api');
}
