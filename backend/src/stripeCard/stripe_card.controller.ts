import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Req,
  UseGuards,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { StripeCardService } from './stripe_card.service';
import { StripeCardModel } from '../dto/index';
import { RolesGuard } from 'src/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles.decorator';

@Controller('stripe-card')
export class StripeCardController {
  constructor(private readonly stripeCardService: StripeCardService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('parent')
  async create(
    @Body(new ValidationPipe()) stripeCardModel: StripeCardModel,
    @Req() req,
  ) {
    const stripeCardModelData = {
      ...stripeCardModel,
      user: req.user,
      stripe_user_id: null,
      stripe_card_id: null,
    };

    const exp = stripeCardModelData.exp_date.toString().split('/');
    const stripe_token = await this.stripeCardService.createStripeToken({
      number: stripeCardModelData.card_no,
      name: stripeCardModelData.card_holder_name,
      cvc: stripeCardModel.cvc,
      exp_month: exp[0],
      exp_year: exp[1],
    });
    const stripe_customer = await this.stripeCardService.createStripeCustomer({
      email: stripeCardModelData.user.email,
      source: stripe_token.id,
      description: 'fees',
      name: `${req.user.first_name + ' ' + req.user.last_name}`,
      address: {
        line1: req.user.address,
        postal_code: req.user.zip,
        city: req.user.province,
      },
    });

    stripeCardModelData.stripe_user_id = stripe_customer.id;
    stripeCardModelData.stripe_card_id = stripe_token.card.id;

    return await this.stripeCardService.createStripeCard({
      ...stripeCardModelData,
      card_no: stripe_token.card.last4,
    });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('parent')
  async findByUserCard(@Req() req) {
    const userId = req.user.id;
    return await this.stripeCardService.findByUserCard(userId);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('parent')
  async update(
    @Body(new ValidationPipe()) stripeCardModel: StripeCardModel,
    @Req() req,
  ) {
    if (stripeCardModel.card_no !== 0 || stripeCardModel.cvc !== 0) {
      let item;
      await this.remove(req).then(async () => {
        item = await this.create(stripeCardModel, req);
      });
      return item;
    } else {
      const cardExist = await this.stripeCardService.findOne(req.user.id);
      if (!cardExist) {
        return { message: 'Id miss match' };
      }
      const stripeCardData = {
        ...stripeCardModel,
        user: req.user,
        stripe_user_id: cardExist.stripe_user_id,
        stripe_card_id: cardExist.stripe_card_id,
      };
      await this.stripeCardService.update(req.user.id, {
        card_holder_name: stripeCardData.card_holder_name,
        exp_date: stripeCardData.exp_date,
      });
      return await this.stripeCardService.updateStripeCard(stripeCardData);
    }
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('parent')
  async remove(@Req() req) {
    const cardExist = await this.stripeCardService.findOne(req.user.id);
    if (!cardExist) {
      return { message: 'Id miss match' };
    }
    await this.stripeCardService.remove(req.user.id);
    return this.stripeCardService.deleteStripeCustomer(
      cardExist.stripe_user_id,
    );
  }
}
