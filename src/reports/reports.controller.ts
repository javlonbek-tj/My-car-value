import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { Serialize } from '../interceptors/serialize-interceptor';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user-decorator';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dtos/approveReport.dto';
import { CreateReportDto } from './dtos/create.report.dto';
import { GetEstimateDto } from './dtos/get.estimate.dto';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';
import { UpdateReportDto } from './dtos/update.report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post()
  @Serialize(ReportDto)
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Get()
  @Serialize(ReportDto)
  @UseGuards(AuthGuard)
  getAllReports() {
    return this.reportsService.findAllReports();
  }

  @Patch('/approve/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  updateReport(
    @Param('id') id: string,
    @Body() body: UpdateReportDto,
    @CurrentUser() user: User,
  ) {
    return this.reportsService.updateReport(id, user, body);
  }

  @Get('/estimatePrice')
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  removeReport(@Param('id') id: string) {
    return this.reportsService.deleteReport(parseInt(id));
  }
}
