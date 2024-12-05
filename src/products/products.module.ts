import { Module } from '@nestjs/common';
import { AdminProductsService } from './admin/admin-products.service';
import { AdminProductsController } from './admin/admin-products.controller';
import { ProductsController } from './public/products.controller';
import { ProductsService } from './public/products.service';

@Module({
  controllers: [AdminProductsController, ProductsController],
  providers: [AdminProductsService, ProductsService],
})
export class ProductsModule {}
