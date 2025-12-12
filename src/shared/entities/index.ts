import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Battle } from './battles.entity';

export const entities: EntityClassOrSchema[] = [Battle];
