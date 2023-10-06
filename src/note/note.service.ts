import { ForbiddenException, Injectable } from '@nestjs/common';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NoteService {
    constructor(private prismaService: PrismaService) { }
    async getNotes(userId: number) {
        return await this.prismaService.note.findMany({
            where: {
                userId
            }
        })
    }
    async getNoteById(noteId: number) {
        return await this.prismaService.note.findFirst({
            where: {
                id: noteId
            }
        })
    }
    async insertNote(userId: number, insertNoteDTO: InsertNoteDTO) {
        return await this.prismaService.note.create({
            data: {
                ...insertNoteDTO,
                userId
            }
        });
    }
    async updateNoteById(noteId: number, updateNoteDTO: UpdateNoteDTO) {
        const note = await this.prismaService.note.findUnique({
            where: {
                id: noteId
            }
        })

        if (!note) throw new ForbiddenException('Cannot find Note to update');

        return this.prismaService.note.update({
            where: {
                id: noteId
            },
            data: { ...updateNoteDTO }
        })
    }
    async deleteNoteById(noteId: number) {
        const note = await this.prismaService.note.findUnique({
            where: {
                id: noteId
            }
        });

        if (!note) throw new ForbiddenException('Cannot find Note tp delete');

        return await this.prismaService.note.delete({
            where: {
                id: noteId
            }
        });
    }
}
