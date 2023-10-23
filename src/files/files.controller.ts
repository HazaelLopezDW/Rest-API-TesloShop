import { Controller,  Post, UseInterceptors, UploadedFile, BadRequestException, 
         Get, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileFilter, FileNamer } from './helpers';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}


  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {

    const path = this.filesService.getStaticPrdoctImage(imageName)

    res.sendFile(path);
  }


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

    const secureUrl = `${file.filename}`

    return {secureUrl};
  }

}
