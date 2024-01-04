import { Module } from '@nestjs/common';
import { PaymentDeductionService } from './payment_deduction.service';
import { PaymentDeductionController } from './payment_deduction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentDeductionEntity, StripeCardEntity } from '../entities/index';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentDeductionEntity, StripeCardEntity]),
  ],
  controllers: [PaymentDeductionController],
  providers: [PaymentDeductionService],
})
export class PaymentDeductionModule {}
