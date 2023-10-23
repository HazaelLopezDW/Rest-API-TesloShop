import { Controller,  Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileFilter, FileNamer } from './helpers';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}


  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: FileFilter,
    // limits: {fileSize: 3000}
    storage: diskStorage({
      destination: './static/uploads',
      filename: FileNamer
    })
  }))
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
  ){

    if(!file) {
      throw new BadRequestException(`Maekl sure that the file is an image`);
    }

    console.log(file);

    return {
      fileName: file.originalname
    };
  }

}
