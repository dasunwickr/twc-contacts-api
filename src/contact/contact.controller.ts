import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { ContactService } from './contact.service';
  import { ContactDto } from './dto/contact.dto';
  import { JwtGuard } from 'src/auth/guard';
  import { GetUser } from 'src/auth/decorator';
  import { User } from '@prisma/client';
  
  @UseGuards(JwtGuard)
  @Controller('contact')
  export class ContactController {
    constructor(private readonly contactService: ContactService) {}
  
    @Post()
    create(@Body() createContactDto: ContactDto, @GetUser() user: User) {
      createContactDto.userId = user.id;
      return this.contactService.create(createContactDto);
    }
  
    @Get()
    findAll(@Request() req) {
      return this.contactService.findAll(req.user.id);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.contactService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateContactDto: ContactDto) {
      return this.contactService.update(+id, updateContactDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.contactService.remove(+id);
    }
  }
  