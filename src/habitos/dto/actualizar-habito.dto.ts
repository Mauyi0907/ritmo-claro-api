import { PartialType } from '@nestjs/swagger';
import { CrearHabitoDto } from './crear-habito.dto';

export class ActualizarHabitoDto extends PartialType(CrearHabitoDto) {}
