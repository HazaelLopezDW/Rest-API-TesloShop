import { Injectable, InternalServerErrorException, Logger, BadRequestException, NotFoundException 
         } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');


  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ){}


  async create(createProductDto: CreateProductDto) {
    try {

      //? Insertar productos en la base de datos con nuestro repositorio
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }


  async findAll(paginationDto: PaginationDto) {

    const {limit = 10, offset = 0 } = paginationDto;

    return await this.productRepository.find({
      take: limit,
      skip: offset,
      // TODO: relaciones DB
    });
  }


  async findOne(id: string) {

    const product = await this.productRepository.findOneBy({id});

    if(!product) 
      throw new NotFoundException(`Product with Id ${id} not found`);

    return product;
  }


  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const product  = await this.findOne(id);
    await this.productRepository.remove(product);
  }


  private handleDBExceptions(error: any) {
    if(error.code === '23505') throw new BadRequestException(error.detail);

      this.logger.error(error);
      throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
