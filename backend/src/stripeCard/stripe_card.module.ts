import { Module } from '@nestjs/common';
import { StripeCardService } from './stripe_card.service';
import { StripeCardController } from './stripe_card.controller';
import { StripeCardEntity } from '../entities/index';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StripeCardEntity])],
  controllers: [StripeCardController],
  providers: [StripeCardService],
})
export class StripeCardModule {}
