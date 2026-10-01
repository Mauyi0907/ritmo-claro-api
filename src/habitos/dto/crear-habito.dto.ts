import { IsEnum, IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EstadoHabito, FrecuenciaHabito } from '@prisma/client';

export class CrearHabitoDto {
  @ApiProperty({ example: 'Hacer ejercicio', minLength: 3, maxLength: 120 })
  @IsString()
  @Length(3, 120)
  nombre: string;

  @ApiPropertyOptional({ example: 'Rutina de 30 minutos al día', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  descripcion?: string;

  @ApiPropertyOptional({ enum: EstadoHabito, default: EstadoHabito.ACTIVO })
  @IsOptional()
  @IsEnum(EstadoHabito)
  estado?: EstadoHabito;

  @ApiPropertyOptional({ enum: FrecuenciaHabito, default: FrecuenciaHabito.DIARIA })
  @IsOptional()
  @IsEnum(FrecuenciaHabito)
  frecuencia?: FrecuenciaHabito;
}
