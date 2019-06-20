import { Entity } from 'typeorm';
import { PensjaPremiaEntity } from '../../shared/entities';

@Entity('ekstra_premia')
export class EkstraPremiaEntity extends PensjaPremiaEntity {
}
