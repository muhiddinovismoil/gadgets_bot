import { Module } from '@nestjs/common';
import { LaptpScene } from './scene/laptop.scenes';

@Module({
    imports: [],
    providers: [LaptpScene],  
})


export class LaptopSceneModule {}