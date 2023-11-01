import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, 
         OneToMany, 
         ManyToOne} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from '../../auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {

    @ApiProperty({ 
        example: '69051a6b-67b7-47f2-8c8b-9ff712df784e',
        description: 'Produc Id',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @ApiProperty({ 
        example: 'T-shirt Teslo',
        description: 'Product Title',
        uniqueItems: true
    })
    @Column('text', { 
        unique: true,
     })
    title: string;

    
    @ApiProperty({ 
        example: 0,
        description: 'Product Price'
    })
    @Column('float', {
        default: 0
    })
    price: number;


    @ApiProperty({ 
        example: 'Excepteur incididunt nostrud do veniam dolore nostrud.',
        description: 'Product Description',
        default: null
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;


    @ApiProperty({ 
        example: 't_shirt_teslo',
        description: 'Product SLUG - for SEO',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    slug: string;


    @ApiProperty({ 
        example: 10,
        description: 'Product stock',
        default: 0
    })
    @Column('int', {
        default: 0
    })
    stock: number;


    @ApiProperty({ 
        example: ['S', 'M', 'L', 'XL', 'XXL'],
        description: 'Product size'
    })
    @Column('text', {
        array: true
    })
    sizes: string[];

    @ApiProperty({ 
        example: 'female',
        description: 'Product gender',
        default: 'female'
    })
    @Column('text')
    gender: string;

    @ApiProperty()
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];


    @ManyToOne(
        () => User,
        (user) => user.product,
        {eager: true}
    )
    user: User;



    @BeforeInsert()
    checkSlugInsert() {
        if(!this.slug) {
            this.slug = this.title;
        }
        this.slug = this.slug.toLowerCase().replaceAll(' ', '_').replace("'",'');
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug.toLowerCase().replaceAll(' ', '_').replace("'",'');
    }

}
