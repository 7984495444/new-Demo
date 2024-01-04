import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StripeCardEntity as StripeCard } from '../entities/index';
import Stripe from 'stripe';

@Injectable()
export class StripeCardService {
  private readonly stripe: Stripe;
  constructor(
    @InjectRepository(StripeCard)
    private readonly stripeCardRepository: Repository<StripeCard>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async createStripeToken(card: any): Promise<any> {
    const token = await this.stripe.tokens.create({ card });
    return token;
  }

  async createStripeCustomer(customerData: any): Promise<any> {
    return await this.stripe.customers.create(customerData);
  }

  async createStripeCard(stripeModel: any): Promise<any> {
    return await this.stripeCardRepository.save({
      user: stripeModel.user.id,
      stripe_user_id: stripeModel.stripe_user_id,
      card_no: stripeModel.card_no,
      card_holder_name: stripeModel.card_holder_name,
      exp_date: stripeModel.exp_date,
      stripe_card_id: stripeModel.stripe_card_id,
      cvc: stripeModel.cvc,
    });
  }

  async findByUserCard(id: number): Promise<any> {
    return await this.stripeCardRepository
      .createQueryBuilder('stripe_card')
      .select([
        'stripe_card.id',
        'stripe_card.card_no',
        'stripe_card.card_holder_name',
        'stripe_card.cvc',
        'stripe_card.exp_date',
      ])
      .where('stripe_card.user_id = :id', {
        id,
      })
      .getOne();
  }

  async findOne(id: number): Promise<StripeCard> {
    return await this.stripeCardRepository
      .createQueryBuilder('stripe_card')
      .select([
        'stripe_card',
        'user.first_name',
        'user.last_name',
        'user.profile_image',
        'user.gender',
        'user.email',
        'user.dob',
      ])
      .where('stripe_card.user_id = :id', {
        id,
      })
      .leftJoin('stripe_card.user', 'user')
      .getOne();
  }

  async update(id: number, stripeModel: any): Promise<any> {
    return await this.stripeCardRepository
      .createQueryBuilder()
      .update('stripe_card')
      .set({ ...stripeModel })
      .where('stripe_card.user_id = :id', { id })
      .execute();
  }

  async updateStripeCard(customerData: any): Promise<any> {
    const exp = customerData.exp_date.toString().split('/');
    return await this.stripe.customers.updateSource(
      customerData.stripe_user_id,
      customerData.stripe_card_id,
      {
        name: customerData.card_holder_name,
        exp_month: exp[0],
        exp_year: exp[1],
      },
    );
  }

  async remove(id: number) {
    return await this.stripeCardRepository
      .createQueryBuilder()
      .delete()
      .where('user_id = :id', { id })
      .execute();
  }

  async deleteStripeCustomer(stripe_user_id: string): Promise<any> {
    return await this.stripe.customers.del(stripe_user_id);
  }

  // async findStripeCard(customerData: any): Promise<any> {
  //   return await this.stripe.customers.retrieveSource(
  //     customerData.stripe_user_id,
  //     customerData.stripe_card_id,
  //   );
  // }

  // async createPayment(
  //   customerId: string,
  //   amount: number,
  //   description: string,
  // ): Promise<string> {
  //   const paymentIntent = await this.stripe.paymentIntents.create({
  //     amount,
  //     currency: 'usd',
  //     description,
  //     customer: customerId,
  //   });
  //   return paymentIntent.client_secret;
  // }

  // async findByCardNo(card_no: string): Promise<StripeCard> {
  //   return await this.stripeCardRepository.findOne({
  //     where: {
  //       card_no,
  //     },
  //   });
  // }
}
