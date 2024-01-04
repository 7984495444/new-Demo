import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Req,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { PaymentDeductionService } from './payment_deduction.service';
import { PaymentDeductionModel } from '../dto/payment_deduction.dto';
import { RolesGuard } from 'src/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles.decorator';

@Controller('payment-deduction')
export class PaymentDeductionController {
  constructor(
    private readonly paymentDeductionService: PaymentDeductionService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor', 'parent')
  async create(
    @Body(new ValidationPipe()) paymentDeductionModel: PaymentDeductionModel,
    @Req() req,
  ) {
    const cardExist = await this.paymentDeductionService.findUserCard(
      req.user.id,
    );
    if (!cardExist) {
      return { message: 'Card not exist!' };
    }
    const paymentIntents = await this.paymentDeductionService.createPayment(
      paymentDeductionModel,
      cardExist,
    );
    const paymentDeductionData = {
      ...paymentDeductionModel,
      user: req.user.id,
      payment_status: paymentIntents.status,
    };
    return this.paymentDeductionService.create(paymentDeductionData);
  }

  @Get('customer')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('parent')
  async getPaymentIntentsForCustomer(@Req() req) {
    const cardExist = await this.paymentDeductionService.findUserCard(
      req.user.id,
    );
    if (!cardExist) {
      return { message: 'Card not exist!' };
    }
    return await this.paymentDeductionService.getCustomerPayment(
      cardExist[0].stripe_user_id,
    );
  }

  @Get('total')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async getTotalPrice(@Req() req): Promise<any> {
    const cardExist = await this.paymentDeductionService.findUserCard(
      req.user.id,
    );
    if (!cardExist) {
      return { message: 'Card not exist!' };
    }
    return await this.paymentDeductionService.getCustomerPaymentTotal(
      cardExist[0].stripe_user_id,
    );
  }
  @Get('total/:year')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async getTotalPriceLastYear(
    @Param('year') year: string,
    @Req() req,
  ): Promise<any> {
    const cardExist = await this.paymentDeductionService.findUserCard(
      req.user.id,
    );
    if (!cardExist) {
      return { message: 'Card not exist!' };
    }
    return await this.paymentDeductionService.getCustomerPaymentLastYearTotal(
      cardExist[0].stripe_user_id,
      year,
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent')
  async getTutorPayment(@Param('id') id: number, @Req() req) {
    const paymentDeduction = await this.paymentDeductionService.getTutorPayment(
      id,
      req.user,
    );
    return paymentDeduction;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent')
  async getPaymentIntents(
    @Query('limit') limit: number,
    @Query('startingAfter') startingAfter: string,
  ) {
    const paymentIntents = await this.paymentDeductionService.getAllPayment({
      limit,
      startingAfter,
    });
    return {
      data: paymentIntents.data,
      hasMore: !!paymentIntents.has_more,
      startingAfter:
        paymentIntents.data.length > 0
          ? paymentIntents.data[paymentIntents.data.length - 1].id
          : null,
    };
  }

  @Get('/payment/details')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor')
  async getUserPaymentDeductionDetails(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.paymentDeductionService.getUserPaymentDeductionDetails(
      page,
      limit,
    );
  }
}
