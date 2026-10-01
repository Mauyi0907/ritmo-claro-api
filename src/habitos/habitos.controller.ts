import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { HabitosService } from './habitos.service';
import { CrearHabitoDto } from './dto/crear-habito.dto';
import { ActualizarHabitoDto } from './dto/actualizar-habito.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UsuarioActual } from '../auth/decorators/usuario-actual.decorator';
import { Rol } from '@prisma/client';

@ApiTags('habitos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('habitos')
export class HabitosController {
  constructor(private readonly habitosService: HabitosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo hábito' })
  crear(@UsuarioActual('id') usuarioId: string, @Body() dto: CrearHabitoDto) {
    return this.habitosService.crear(usuarioId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener los hábitos del usuario autenticado' })
  obtenerMisHabitos(@UsuarioActual('id') usuarioId: string) {
    return this.habitosService.obtenerTodosDelUsuario(usuarioId);
  }

  @Get('admin/todos')
  @Roles(Rol.ADMIN)
  @ApiOperation({ summary: 'Consulta administrativa global (Solo ADMIN)' })
  obtenerTodosAdmin() {
    return this.habitosService.obtenerTodosAdmin();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un hábito propio por ID' })
  obtenerPorId(@Param('id') id: string, @UsuarioActual('id') usuarioId: string) {
    return this.habitosService.obtenerPorId(id, usuarioId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente un hábito propio' })
  actualizar(
    @Param('id') id: string,
    @UsuarioActual('id') usuarioId: string,
    @Body() dto: ActualizarHabitoDto,
  ) {
    return this.habitosService.actualizar(id, usuarioId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un hábito propio' })
  eliminar(@Param('id') id: string, @UsuarioActual('id') usuarioId: string) {
    return this.habitosService.eliminar(id, usuarioId);
  }
}

