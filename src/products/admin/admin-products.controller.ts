import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AdminProductsService } from './admin-products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { UserRoles } from 'src/auth/roles/roles';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Roles(UserRoles.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
@Controller('admin/products')
export class AdminProductsController {
  constructor(private readonly productsService: AdminProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('/:product_id')
  findOne(@Param('product_id') product_id: string) {
    return this.productsService.findOne(product_id);
  }

  @Patch(':product_id')
  update(
    @Param('product_id') product_id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(product_id, updateProductDto);
  }

  @HttpCode(204)
  @Delete(':product_id')
  remove(@Param('product_id') product_id: string) {
    return this.productsService.remove(product_id);
  }
}
