import { Controller,  Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileFilter } from './helpers/fileFilter.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}


  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: FileFilter
  }))
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
  ){

    if(!file) {
      throw new BadRequestException(`Maekl sure that the file is an image`);
    }

    return {
      fileName: file.originalname
    };
  }

}
