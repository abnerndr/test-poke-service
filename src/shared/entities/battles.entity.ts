import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { v7 as uuid } from 'uuid';

@Entity('battles')
export class Battle extends BaseEntity {
  @PrimaryColumn('uuid')
  id = uuid();

  @Column({ name: 'first_pokemon_id', type: 'integer' })
  firstPokemonId: number;

  @Column({ name: 'second_pokemon_id', type: 'integer' })
  secondPokemonId: number;

  @Column({ name: 'winner_id', type: 'integer', nullable: true })
  winnerId: number | null;

  @Column({
    name: 'occurred_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  occurredAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, unknown> | null;
}
