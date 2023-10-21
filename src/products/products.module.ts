import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductImage } from './entities/';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService
  ],
  imports: [
    //* Importamos nuestro entity de productos con TypeOrm
    TypeOrmModule.forFeature([ Product, ProductImage ])
  ]
})
export class ProductsModule {}
