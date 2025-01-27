import { Injectable } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}
  create(createContactDto: ContactDto) {
    return this.prisma.contact.create({
      data: createContactDto,
    });
  }

  findAll(userId: number) {
    return this.prisma.contact.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.contact.findUnique({
      where: { id },
    });
  }

  update(id: number, updateContactDto: ContactDto) {
    return this.prisma.contact.update({
      where: { id },
      data: updateContactDto,
    });
  }

  remove(id: number) {
    return this.prisma.contact.delete({
      where: { id },
    });
  }
}
