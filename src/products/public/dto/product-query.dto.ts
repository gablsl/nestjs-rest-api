import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class ProductQueryDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  page: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number;
}
