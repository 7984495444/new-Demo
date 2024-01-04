import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  UseInterceptors,
  Req,
  UploadedFiles,
  Res,
  Delete,
} from '@nestjs/common';
import { TutorDocumentService } from './tutor-document.service';
import { TutorDocumentModel } from '../dto/index';
import { RolesGuard } from 'src/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles.decorator';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';

@Controller('tutor_document')
export class TutorDocumentController {
  constructor(private readonly tutorDocumentService: TutorDocumentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(
    @Req() req,
    @Body() tutorDocumentModel: TutorDocumentModel,
    @UploadedFiles() identity_documents: Array<Express.Multer.File>,
  ) {
    if (!tutorDocumentModel.identity_documents) {
      tutorDocumentModel.identity_documents = [];
    }
    tutorDocumentModel.identity_documents.push(
      { document_face: '' },
      { document_back: '' },
    );
    const identityDocuments = JSON.parse(
      JSON.stringify(tutorDocumentModel.identity_documents),
    );
    const university_proof = tutorDocumentModel.university_proof;

    const document_face = identity_documents?.filter((item) => {
      if (item.fieldname === 'document_face') {
        return item.filename;
      }
    });
    const document_back = identity_documents?.filter((item) => {
      if (item.fieldname === 'document_back') {
        return item.filename;
      }
    });
    identityDocuments[0]['document_face'] = document_face[0].filename;
    identityDocuments[1]['document_back'] = document_back[0].filename;

    const backgroundcheck_proof = identity_documents?.filter((item) => {
      if (item.fieldname === 'backgroundcheck_proof') {
        return item.filename;
      }
    });
    for (let i = 0; i < university_proof.length; i++) {
      identity_documents?.filter((item) => {
        if (item.fieldname === `university_proof[${i}][document_name]`) {
          university_proof[i]['document_name'] = item.filename;
        }
      });
    }
    const transit_no = tutorDocumentModel.transit_no;
    const institution_no = tutorDocumentModel.institution_no;
    const account_no = tutorDocumentModel.account_no;

    const tutorDocumentModelss = {
      user: req.user.id,
      identity_documents: identityDocuments,
      university_proof: JSON.parse(JSON.stringify(university_proof)),
      backgroundcheck_proof: backgroundcheck_proof[0].filename,
      transit_no: transit_no,
      institution_no: institution_no,
      account_no: account_no,
    };

    return this.tutorDocumentService.create(tutorDocumentModelss);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor')
  async findDocument(@Req() req) {
    return this.tutorDocumentService.findOne(req.user.id);
  }

  @Get('image/:image')
  @Roles('tutor')
  getImageFile(@Req() req, @Res() res) {
    res.sendfile(
      join(__dirname, '../../uploads/tutor_documents/' + req.params.image),
    );
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor')
  @UseInterceptors(AnyFilesInterceptor())
  async update(
    @Body() tutorDocumentModel: TutorDocumentModel,
    @UploadedFiles() identity_documents: Array<Express.Multer.File>,
    @Req() req,
  ) {
    const tutor_document =
      await this.tutorDocumentService.findIdentityDocuments(req.user.id);

    // create array object for identity
    if (!tutorDocumentModel.identity_documents) {
      tutorDocumentModel.identity_documents = [];
    }
    tutorDocumentModel.identity_documents.push(
      { document_face: '' },
      { document_back: '' },
    );
    const identityDocuments = tutorDocumentModel.identity_documents;
    const document_face = identity_documents?.filter((item) => {
      if (item.fieldname === 'document_face') {
        return item.filename;
      }
    });
    const document_back = identity_documents?.filter((item) => {
      if (item.fieldname === 'document_back') {
        return item.filename;
      }
    });
    identityDocuments[0]['document_face'] =
      document_face[0]?.filename || tutor_document?.document_face;
    identityDocuments[1]['document_back'] =
      document_back[0]?.filename || tutor_document?.document_back;

    const IdentityDocuments = identityDocuments.filter(
      (item) => !Object.values(item).includes(undefined),
    );

    //update background document
    const backgroundcheck_proof = identity_documents?.filter((item) => {
      if (item?.fieldname === 'backgroundcheck_proof') {
        return item?.filename;
      }
    });
    const transit_no = tutorDocumentModel.transit_no;
    const institution_no = tutorDocumentModel.institution_no;
    const account_no = tutorDocumentModel.account_no;

    const tutorDocumentModelss = {
      user: req.user.id,
      identity_documents: IdentityDocuments,
      transit_no: transit_no,
      institution_no: institution_no,
      account_no: account_no,
    };
    if (backgroundcheck_proof.length > 0) {
      tutorDocumentModelss['backgroundcheck_proof'] =
        backgroundcheck_proof[0].filename;
    }
    return this.tutorDocumentService.update(req.user.id, tutorDocumentModelss);
  }

  //upload University Proof
  @Patch('/university_proof')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadUniversityProof(
    @Req() req,
    @Body() tutorDocumentModel: TutorDocumentModel,
    @UploadedFiles() identity_documents: Array<Express.Multer.File>,
  ) {
    const getData = await this.findDocument(req);

    const university_proof = tutorDocumentModel.university_proof;

    for (let i = 0; i < university_proof.length; i++) {
      identity_documents?.filter((item) => {
        if (item.fieldname === `university_proof[${i}][document_name]`) {
          university_proof[i]['document_name'] = item.filename;
        }
      });
    }
    const tutorDocumentModelss = {
      user: req.user.id,
      university_proof: JSON.parse(JSON.stringify(university_proof)),
    };
    getData.university_proof.forEach((element) => {
      tutorDocumentModelss.university_proof.push(element);
    });
    return this.tutorDocumentService.update(req.user.id, tutorDocumentModelss);
  }

  //delete document
  @Delete()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor')
  async deleteDocument(
    @Req() req,
    @Body() tutorDocumentModel: TutorDocumentModel,
  ) {
    const getData = await this.findDocument(req);
    if (getData !== null) {
      return this.tutorDocumentService.update(req.user.id, tutorDocumentModel);
    }
  }
}
