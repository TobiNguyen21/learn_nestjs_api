import { Controller, Get, Post, UseGuards, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard';
import { NoteService } from './note.service';
import { GetUser } from '../auth/decorator';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';

@UseGuards(MyJwtGuard)
@Controller('note')
export class NoteController {
    constructor(
        private noteService: NoteService
    ) { }
    @Get()
    getNotes(@GetUser('id', ParseIntPipe) userId: number) {
        return this.noteService.getNotes(userId);
    }
    @Get(':id')
    getNoteById(@Param('id', ParseIntPipe) noteId: number) {
        return this.noteService.getNoteById(noteId);
    }
    @Post()
    insertNote(
        @GetUser('id', ParseIntPipe) userId: number,
        @Body() insertNoteDTO: InsertNoteDTO
    ) {
        console.log('Insert note');
        console.log(`userId: ${userId}, insertData: ${JSON.stringify(insertNoteDTO)}`);
        return this.noteService.insertNote(userId, insertNoteDTO);
    }
    @Patch()
    updateNoteById(
        @Param('id', ParseIntPipe) noteId: number, // validate noteId is number
        @Body() updateNoteDTO: UpdateNoteDTO

    ) {
        return this.noteService.updateNoteById(noteId, updateNoteDTO);
    }
    @Delete()
    deleteNoteById(@Param('id', ParseIntPipe) noteId: number) {
        return this.noteService.deleteNoteById(noteId);
    }
}
