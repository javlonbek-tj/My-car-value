import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Between, Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create.report.dto';
import { Report } from './report.entity';
import { GetEstimateDto } from './dtos/get.estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.userId = user.id;
    return this.repo.save(report);
  }

  async findAllReports() {
    return this.repo.find();
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: parseInt(id) } });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    report.approved = approved;
    return this.repo.save(report);
  }

  async updateReport(id: string, user: User, attrs: Partial<Report>) {
    const report = await this.repo.findOne({
      where: { id: parseInt(id) },
    });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    if (report.userId !== user.id) {
      throw new UnauthorizedException(
        'You are not authorized to update this report',
      );
    }
    Object.assign(report, attrs);
    return this.repo.save(report);
  }

  createEstimate({ make, model, year, mileage, lng, lat }: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('LOWER(make) = LOWER(:make)', { make }) // We use it for case sensitive
      .andWhere('LOWER(model) = LOWER(:model)', { model })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }

  async deleteReport(id: number) {
    const report = await this.repo.findOneBy({ id });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return this.repo.remove(report);
  }
}
