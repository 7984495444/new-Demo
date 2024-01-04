import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
// import { PaymentDeductionModel } from '../dto/payment_deduction.dto';
import {
  PaymentDeductionEntity as PaymentDeduction,
  StripeCardEntity as StripeCard,
} from '../entities/index';

@Injectable()
export class PaymentDeductionService {
  private readonly stripe: Stripe;
  constructor(
    @InjectRepository(PaymentDeduction)
    private readonly paymentDeductionRepository: Repository<PaymentDeduction>,
    @InjectRepository(StripeCard)
    private readonly stripeCardRepository: Repository<StripeCard>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async getCustomerPayment(customerId: string): Promise<any> {
    const paymentIntents = await this.stripe.paymentIntents.list({
      customer: customerId,
    });
    return paymentIntents.data;
  }
  async getCustomerPaymentLastYearTotal(
    cus_id: string,
    year: string,
  ): Promise<number> {
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    let total = 0;
    let hasMore = true;
    let startingAfter = undefined;
    while (hasMore) {
      const paymentIntents = await this.stripe.paymentIntents.list({
        customer: cus_id,
        created: {
          gte: Math.floor(startDate.getTime() / 1000),
          lte: Math.floor(endDate.getTime() / 1000),
        },
        limit: 100,
        starting_after: startingAfter,
      });
      for (const paymentIntent of paymentIntents.data) {
        total += paymentIntent.amount;
      }
      hasMore = paymentIntents.has_more;
      if (hasMore) {
        startingAfter = paymentIntents.data[paymentIntents.data.length - 1].id;
      }
    }
    return total / 100;
  }

  async getCustomerPaymentTotal(cus_id: string): Promise<any> {
    const totalAmounts = [];
    let hasMore = true;
    let startingAfter = undefined;

    while (hasMore) {
      const paymentIntents = await this.stripe.paymentIntents.list({
        customer: cus_id,
        limit: 100,
        starting_after: startingAfter,
      });
      const totalAmount = paymentIntents.data.reduce(
        (accumulator, paymentIntent) => accumulator + paymentIntent.amount,
        0,
      );
      totalAmounts.push(totalAmount);
      hasMore = paymentIntents.has_more;
      if (hasMore) {
        startingAfter = paymentIntents.data[paymentIntents.data.length - 1].id;
      }
    }
    const total = totalAmounts.reduce(
      (accumulator, currentTotal) => accumulator + currentTotal,
      0,
    );
    return total / 100;
  }

  async getAllPayment(payment: any): Promise<any> {
    return await this.stripe.paymentIntents.list({
      limit: payment.limit,
      starting_after: payment.startingAfter,
    });
  }

  async createPayment(charge: any, cus: any): Promise<any> {
    const customer = cus[0];
    return await this.stripe.paymentIntents.create({
      amount: charge.amount * 100,
      currency: 'usd',
      customer: customer.stripe_user_id,
      description: 'Fees for Success Scolaire',
      payment_method_types: ['card'],
      payment_method: customer.stripe_card_id,
      confirm: true,
      confirmation_method: 'automatic',
    });
  }

  async create(paymentDeductionModel: any) {
    return await this.paymentDeductionRepository.save(paymentDeductionModel);
  }

  async findAll(): Promise<PaymentDeduction[]> {
    return await this.paymentDeductionRepository
      .createQueryBuilder('payment_deduction')
      .leftJoin('payment_deduction.tutor_id', 'tutor_id')
      .select([
        'payment_deduction',
        'tutor_id.first_name',
        'tutor_id.last_name',
        'tutor_id.profile_image'
      ])
      .getMany();
  }
  async getTutorPayment(id: number, user: any) {
    const queryBuilder = await this.paymentDeductionRepository
      .createQueryBuilder('payment_deduction')
      .leftJoinAndSelect('payment_deduction.tutor_id', 'tutor_id')
      .select([
        'payment_deduction',
        'tutor_id.first_name',
        'tutor_id.last_name',
        'tutor_id.profile_image',
        'tutor_id.email',
      ]);
    if (user.role_id.id === 3) {
      queryBuilder.andWhere('payment_deduction.tutor_id = :id', {
        id: id,
      });
    }
    if (user.role_id.id === 2) {
      queryBuilder.andWhere('payment_deduction.user = :id', {
        id: id,
      });
    }
    return queryBuilder.getMany();
  }

  async findUserCard(id: number): Promise<any> {
    return await this.stripeCardRepository.find({
      where: { user: id },
    });
  }

  async getUserPaymentDeductionDetails(
    page: number,
    limit: number,
  ): Promise<any> {
    const users = await this.findAll();

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedResults = users.slice(startIndex, endIndex);

    const totalUsers = users.length;
    const totalPages = Math.ceil(totalUsers / limit);

    return {
      users: paginatedResults,
      totalUsers,
      totalPages,
      currentPage: page,
    };
  }
}
