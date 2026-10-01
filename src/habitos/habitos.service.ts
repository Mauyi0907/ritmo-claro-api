import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearHabitoDto } from './dto/crear-habito.dto';
import { ActualizarHabitoDto } from './dto/actualizar-habito.dto';

@Injectable()
export class HabitosService {
  constructor(private prisma: PrismaService) {}

  async crear(usuarioId: string, dto: CrearHabitoDto) {
    return this.prisma.habito.create({
      data: {
        ...dto,
        usuarioId,
      },
    });
  }

  async obtenerTodosDelUsuario(usuarioId: string) {
    return this.prisma.habito.findMany({
      where: { usuarioId },
    });
  }

  async obtenerPorId(id: string, usuarioId: string) {
    const habito = await this.prisma.habito.findUnique({ where: { id } });

    if (!habito) {
      throw new NotFoundException('Hábito no encontrado');
    }

    if (habito.usuarioId !== usuarioId) {
      throw new ForbiddenException('No tienes permiso para acceder a este hábito');
    }

    return habito;
  }

  async actualizar(id: string, usuarioId: string, dto: ActualizarHabitoDto) {
    await this.obtenerPorId(id, usuarioId);

    return this.prisma.habito.update({
      where: { id },
      data: dto,
    });
  }

  async eliminar(id: string, usuarioId: string) {
    await this.obtenerPorId(id, usuarioId);

    await this.prisma.habito.delete({ where: { id } });
    return { message: 'Hábito eliminado correctamente' };
  }

  async obtenerTodosAdmin() {
    return this.prisma.habito.findMany({
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        estado: true,
        frecuencia: true,
        creadoEn: true,
        usuario: {
          select: {
            id: true,
            nombre: true,
            email: true,
            rol: true,
          },
        },
      },
    });
  }
}
