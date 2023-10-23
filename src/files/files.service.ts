import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  

    getStaticPrdoctImage(imageName: string) {
        const path = join(__dirname, '../../static/uploads', imageName);

        if(!existsSync(path)) {
            throw new BadRequestException(`Not product fond with image ${imageName}`);
        }

        return path;
    }
}
