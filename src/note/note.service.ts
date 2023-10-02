import { Injectable } from '@nestjs/common';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NoteService {
    constructor(private prismaService: PrismaService) { }
    async getNotes(userId: number) {
        return await this.prismaService.note.findMany({
            where: {
                userId: userId
            }
        })
    }
    async getNoteById(noteId: number) {


    }
    async insertNote(userId: number, insertNoteDTO: InsertNoteDTO) {
        return await this.prismaService.note.create({
            data: {
                ...insertNoteDTO,
                userId
            }
        });
    }
    updateNoteById(noteId: number, updateNoteDTO: UpdateNoteDTO) {

    }
    deleteNoteById(noteId: number) {

    }

}
