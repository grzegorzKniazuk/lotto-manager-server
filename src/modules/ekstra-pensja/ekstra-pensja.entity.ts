import { Entity } from 'typeorm';
import { PensjaPremiaEntity } from '../../shared/entities';

@Entity('ekstra_pensja')
export class EkstraPensjaEntity extends PensjaPremiaEntity {
}
