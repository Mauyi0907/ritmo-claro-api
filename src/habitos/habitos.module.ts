import { Module } from '@nestjs/common';
import { HabitosService } from './habitos.service';
import { HabitosController } from './habitos.controller';

@Module({
  controllers: [HabitosController],
  providers: [HabitosService],
})
export class HabitosModule {}
